# AB 3030 Implementation — Bloom Metabolics

## AI Surfaces in Codebase

| Surface | File | Type | AB 3030 Treatment |
|---------|------|------|-------------------|
| Agent API | app/api/clinic/agents/route.ts | Read + Write suggestions | X-AI-Generated header on all responses. Write suggestions return confirmation tokens, not executed directly. |
| MCP Tools | app/api/clinic/mcp/route.ts | Read + Write operations | Reads execute directly. Writes require confirmation token + clinician approval via /api/clinic/ai-confirmations/[token]/confirm. |
| Patient Profile AI Panel | app/clinic/patients/[id]/page.tsx | Display | AIDisclosure component wraps AI-generated content. "Human-Reviewed" toggle available. |
| AI Suggestions Queue | app/clinic/ai-suggestions/page.tsx | Confirmation UI | Pending AI writes listed with Confirm/Reject buttons. |

## Strict Gate Flow (Write Operations)

1. AI agent/MCP suggests a write (create_alert, create_task, etc.)
2. System calls `createConfirmation()` → generates one-time hex token with 1-hour expiry
3. Token + proposed payload returned to AI surface (NOT executed)
4. Clinician sees suggestion in /clinic/ai-suggestions
5. Clinician clicks Confirm → POST /api/clinic/ai-confirmations/[token]/confirm
6. System verifies: token valid, not expired, not already used
7. Atomic confirm + execute
8. Or: Clinician clicks Reject → POST with reason → token marked rejected

## Human-Review Toggle

- AIDisclosure component shows "AI-Generated Content" badge with AB 3030 disclaimer
- Clinician can click "Mark as Human-Reviewed"
- Toggle captures: clinician ID, timestamp, content hash
- After toggle: badge changes to "Human-reviewed by clinician"
- AI-generated content CANNOT be sent to patients without human-reviewed toggle

## Audit Trail

Every AI interaction is audit-logged:
- Agent invocations (prompt, response, timestamp)
- MCP tool calls (tool, arguments, result)
- Confirmation token lifecycle (created → confirmed/rejected → executed)
- Human-review toggle events
