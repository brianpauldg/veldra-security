# SOP-009 Attachment D — Payment Tracking and 1099 Workflow

**Parent Document:** [SOP-009 Vendor & Contractor Management (1099 Operations)](../SOP-009-vendor-contractor-management.md)
**Version:** 0.1
**Last Updated:** 2026-05-11

---

## Purpose

This attachment defines the bookkeeper's ongoing payment tracking procedures and the quarterly review workflow that ensures accurate year-to-date (YTD) vendor payment records. These records are the foundation for year-end 1099-NEC issuance per [Attachment E](attachment-E-year-end-1099-NEC-issuance-procedure.md).

---

## 1. Per-Payment Logging

Every payment issued to a vendor by Bloom Metabolics LLC must be logged in the accounts payable (AP) tool (QuickBooks, Bill.com, or equivalent) at the time of payment. The payment record includes:

| Field | Description | Example |
| --- | --- | --- |
| **Vendor legal name** | As shown on W-9 | Jane Smith |
| **Payment date** | Date payment was issued | 2026-03-15 |
| **Payment amount** | Gross amount paid | $400.00 |
| **Payment method** | How the payment was delivered | ACH, check #1042, Zelle, Venmo, credit card, wire |
| **Invoice reference** | Invoice number or description | INV-2026-003 or "March bookkeeping retainer" |
| **Expense category** | Chart of accounts category | Professional Services — Bookkeeping |
| **Notes** | Any relevant context | Monthly retainer per engagement letter |

**Rules:**
- Log every payment on the day it is issued. Do not batch entries.
- If payment is made through a platform that auto-records transactions (e.g., QuickBooks bill pay, Bill.com), verify the auto-entry matches the invoice and correct any discrepancies within 1 business day.
- If payment is made via personal credit card, Zelle, Venmo, or cash app, manually log the entry in the AP tool the same day with a note identifying the payment method.
- Payments made by the MSO Owner directly (not through the AP tool) must be reported to the bookkeeper within 2 business days for logging.

---

## 2. Monthly Reconciliation Procedure

The bookkeeper performs a monthly reconciliation of all vendor payments. This reconciliation is completed by the 10th of the following month (e.g., January payments reconciled by February 10).

### Steps

1. **Pull AP tool report.** Generate a vendor payment summary from the AP tool for the prior month. The report should list all payments by vendor with date, amount, and payment method.

2. **Pull bank/payment platform statements.** Obtain statements for the prior month from:
   - Business bank account(s)
   - Business credit card(s)
   - Payment platforms (Stripe, PayPal, Venmo for Business, Zelle — as applicable)

3. **Match payments.** For each payment in the AP tool report, verify that a corresponding debit appears in the bank or payment platform statement. Match by amount, date (allowing for 1–3 business day clearing time), and payee.

4. **Identify discrepancies.** Flag any of the following:
   - Payments in AP tool with no matching bank debit (possible data entry error or payment not yet cleared)
   - Bank debits to vendors with no matching AP tool entry (possible unlogged payment — investigate immediately)
   - Amount mismatches between AP tool and bank statement
   - Duplicate entries in AP tool

5. **Resolve discrepancies.** Investigate and resolve all discrepancies within 5 business days:
   - Data entry errors: correct the AP tool entry
   - Unlogged payments: add the entry to the AP tool and note the reason for the delay
   - Unresolved discrepancies: escalate to MSO Owner with a written description of the issue

6. **Update YTD totals.** After reconciliation, confirm that each vendor's YTD total in the AP tool is accurate as of month-end.

7. **File reconciliation.** Document the reconciliation completion date and any discrepancies found/resolved. The bookkeeper retains the reconciliation record (can be as simple as a dated note in the AP tool or a separate reconciliation log).

### Monthly Reconciliation Report Structure

| Vendor | AP Tool Total (Month) | Bank/Platform Total (Month) | Match? | Discrepancy | Resolution |
| --- | --- | --- | --- | --- | --- |
| [Vendor Name] | $XXX.XX | $XXX.XX | ☐ Yes ☐ No | | |

**Reconciliation completed by:** _______________ **Date:** _______________

---

## 3. Quarterly YTD Review

The MSO Owner reviews YTD payment totals per vendor at least quarterly. Suggested review months: March, June, September, December (aligned with quarter-end).

### Steps

1. **Pull YTD vendor payment report.** The bookkeeper generates a YTD payment summary from the AP tool, listing all vendors with total payments from January 1 through the review date.

2. **Review for accuracy.** The MSO Owner confirms:
   - YTD totals are reconciled and accurate (per monthly reconciliation)
   - No unexpected vendors have appeared in the payment ledger
   - Expense categories are consistent and correctly applied
   - Vendors approaching the $600 threshold are flagged

3. **Threshold flagging.** For any vendor with YTD payments at or above $500:
   - Confirm a current, signed W-9 is on file
   - Flag the vendor for 1099-NEC issuance in January
   - If W-9 is missing, bookkeeper requests it immediately per [Attachment C](attachment-C-w9-and-coi-collection-templates.md)

4. **New vendor check.** Verify that every vendor paid during the quarter has a complete vendor file per [Attachment B](attachment-B-vendor-onboarding-checklist.md). Any vendor file deficiencies are remediated within 5 business days.

5. **Sign-off.** The MSO Owner signs the quarterly review. The signed review is retained in the SOP-009 records.

### Quarterly YTD Review Structure

**Review Period:** Q[X] 2026 (January 1 – [MONTH] [DAY], 2026)
**Review Date:** _______________

| Vendor | YTD Total | W-9 on File? | 1099 Flag? | Vendor File Complete? | Notes |
| --- | --- | --- | --- | --- | --- |
| [Vendor Name] | $X,XXX.XX | ☐ Yes ☐ No | ☐ Yes ☐ N/A | ☐ Yes ☐ No | |

**MSO Owner Signature:** _______________ **Date:** _______________

---

## 4. Mid-Year W-9 Refresh

If a vendor notifies Bloom that their EIN, SSN, address, legal name, or entity type has changed during the year, the following procedure applies:

1. **Request updated W-9.** The bookkeeper sends a W-9 request per [Attachment C](attachment-C-w9-and-coi-collection-templates.md) Template 1.
2. **Update AP tool.** Upon receipt of the updated W-9, the bookkeeper updates the vendor record in the AP tool.
3. **Update vendor file.** The new W-9 is filed in the vendor file. The old W-9 is retained (not destroyed) for audit trail purposes.
4. **Classification review.** If the entity type has changed (e.g., from sole proprietor to S-Corp), the MSO Owner reviews the classification analysis and updates the 1099 reporting determination. The old classification analysis is retained; a new analysis is created to reflect the change.

---

## 5. Threshold Flagging Procedure

The $600 threshold for 1099-NEC issuance is tracked on a per-vendor, per-calendar-year basis.

| YTD Payment Level | Action |
| --- | --- |
| $0–$499 | No action required. Continue payment tracking. |
| $500–$599 | **Pre-threshold flag.** Bookkeeper confirms W-9 is on file and current. Vendor is placed on the 1099 watch list. |
| $600+ | **1099 threshold crossed.** Vendor is confirmed for 1099-NEC issuance in January. If W-9 is missing, all future payments are held until W-9 is received. |

**Important:** The threshold applies to the aggregate of all payments in the calendar year, regardless of payment method. Payments via check, ACH, Zelle, Venmo, credit card, wire, or any other method are all counted toward the $600 threshold.

**Exception — Corporate vendors:** Vendors that are C-Corps or S-Corps (per W-9) are generally exempt from 1099-NEC, so crossing $600 does not trigger issuance. However, the medical/legal exception applies: medical and attorney payments require 1099 regardless of corporate status. The bookkeeper applies this exception when reviewing the 1099 watch list.

---

## 6. Payment Method Documentation

The bookkeeper maintains a record of the payment method used for each vendor. This record is part of the vendor's AP tool profile and is used for:

- Reconciliation (matching AP entries to bank/platform statements)
- 1099 preparation (verifying total compensation across all payment methods)
- Audit defense (demonstrating a complete and accurate payment trail)

| Payment Method | Documentation Required | Reconciliation Source |
| --- | --- | --- |
| Business bank ACH | AP tool entry + bank statement | Bank statement |
| Business bank check | AP tool entry + bank statement + check number | Bank statement (cleared check) |
| Business credit card | AP tool entry + credit card statement | Credit card statement |
| Zelle (business account) | AP tool entry + Zelle transaction record | Bank statement (Zelle appears as debit) |
| Venmo for Business | AP tool entry + Venmo transaction history | Venmo statement + bank statement |
| Wire transfer | AP tool entry + wire confirmation + bank statement | Bank statement |
| PayPal | AP tool entry + PayPal transaction history | PayPal statement + bank statement |
| Cash | AP tool entry + signed receipt from vendor | Signed receipt (no bank statement available) |

**Note:** Cash payments are strongly discouraged. If a cash payment is necessary, the MSO Owner or bookkeeper must obtain a signed receipt from the vendor documenting the amount, date, and purpose. The receipt is filed in the vendor file.

---

*Bloom Metabolics — Confidential*
*This document is governed by [SOP-001 (Document Control & SOP Lifecycle Management)](../../SOP-001-document-control/SOP-001-document-control.md).*
