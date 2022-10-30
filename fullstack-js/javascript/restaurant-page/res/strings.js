/*  Encode strings to base-64 using standard browser functions
 *  https://stackoverflow.com/a/247261/
 *  https://developer.mozilla.org/en-US/docs/Web/API/btoa
 *  https://developer.mozilla.org/en-US/docs/Web/API/atob
 *  https://developer.mozilla.org/en-US/docs/Glossary/Base64
 *
 *  The preferred method in Node (via the `Buffer` API) actually also provides these functions
 */

/* The functions are rather confusingly named... */
const encode = btoa; // [Character] Bytes to Array
const decode = atob;

/* cspell:disable */
/* prettier-ignore */
const strings = {
  PAGE_TITLE:     'MTN0aCBTaGF3YXJtYQ==',
  ITEMS:        [ 'Qm93bA==',
                  'RG9uZXI=', 'Qm94', ],
  DESCRIPTION:    'MTN0aCBTaGF3YXJtYSBpcyBhIHNtYWxsIGxvY2FsIGZvb2QgYnVzaW5lc3MgZXN0YWJsaXNoZWQgYnkgYSB5b3VuZyBjb3VwbGUgYXNwaXJpbmcgdG8gYmVjb21lIGVudHJlcHJlbmV1cnMu',
  TIME:         [ 'SG91cnM=', 'TW9uZGF5cyB0byBGcmlkYXlz', 'MXBtIC0gN3Bt'],
  LOCATION:     [ 'QWRkcmVzcw==',
                  'QjQ5IEwyOCwgQ0hSViBQaC4gMiw=',
                  'TGFuZ2thYW4gSUksIERhc21hcmnxYXM=',
                  'QmVzaWRlIA==',
                  'UmVkeSBIYXJkd2FyZQ==', ],
  LINK:           'aHR0cHM6Ly9mYWNlYm9vay5jb20vMTN0aFNoYXdhcm1h',
};
/* cspell:enable */

export default strings;
export { decode };
