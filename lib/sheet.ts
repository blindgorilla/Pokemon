/**
 * Delivery of the free BUY OR PASS Sheet.
 *
 * Until a real PDF exists the sheet is served as a page (`/checklist`), which
 * is a working deliverable today. Point NEXT_PUBLIC_SHEET_PDF_URL at the file
 * once it is produced and the success panel switches to a download button on
 * its own — no other change required. Deliberately no placeholder URL: a link
 * to a file that does not exist is worse than the page that does.
 */

const configured = process.env.NEXT_PUBLIC_SHEET_PDF_URL?.trim();

/** True once a real PDF is configured. */
export const hasSheetPdf = Boolean(configured);

/** Where the success panel's button points. */
export const sheetHref = configured || "/checklist";
