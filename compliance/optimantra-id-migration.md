# OptiMantra Patient ID Migration Plan

## Current State
All compliance tables (compounded_rx_justifications, pmp_queries, ai_write_confirmations, medical_director_review_queue) use local UUIDs for patient_id. These are Supabase-generated UUIDs from the patients table.

## Target State (Group 5)
patient_id fields will reference OptiMantra patient IDs, enabling direct linkage between Bloom compliance records and OptiMantra clinical charts.

## Migration Steps

1. **Build OptiMantra patient mapping table**
   ```sql
   CREATE TABLE patient_id_mapping (
     bloom_id UUID REFERENCES patients(id),
     optimantra_id TEXT NOT NULL,
     mapped_at TIMESTAMPTZ DEFAULT now(),
     mapped_by TEXT,
     PRIMARY KEY (bloom_id)
   );
   CREATE UNIQUE INDEX ON patient_id_mapping (optimantra_id);
   ```

2. **Populate mapping** — match by email or identifier:
   - Query OptiMantra API for all patients
   - Match Bloom patients by email address
   - Insert into patient_id_mapping
   - Flag unmatched patients for manual review

3. **Update foreign keys** — for each compliance table:
   ```sql
   UPDATE compounded_rx_justifications j
   SET patient_id = m.optimantra_id::UUID
   FROM patient_id_mapping m
   WHERE j.patient_id = m.bloom_id;
   ```
   (Repeat for pmp_queries, ai_write_confirmations, medical_director_review_queue)

4. **Verify no orphans**:
   ```sql
   SELECT * FROM compounded_rx_justifications
   WHERE patient_id NOT IN (SELECT optimantra_id::UUID FROM patient_id_mapping);
   ```

## Rollback Plan
- patient_id_mapping table retains the original bloom_id → optimantra_id mapping
- Reverse migration: UPDATE ... SET patient_id = m.bloom_id FROM patient_id_mapping m WHERE patient_id = m.optimantra_id::UUID
- Migration is reversible as long as patient_id_mapping is not dropped

## Timeline
- Group 5 (post-launch): OptiMantra adapter + this migration
- Prerequisite: OptiMantra API credentials and patient roster access
