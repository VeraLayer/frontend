export const VERALAYER_ADDRESS =
  (process.env.NEXT_PUBLIC_VERALAYER_ADDRESS as `0x${string}`) ??
  "0x0000000000000000000000000000000000000000";

export const VERALAYER_ABI = [
  {
    inputs: [{ internalType: "address", name: "admin", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  // ── Errors ──────────────────────────────────────────────────────────────
  { inputs: [], name: "AccessControlBadConfirmation", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bytes32", name: "neededRole", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  { inputs: [{ internalType: "uint256", name: "id", type: "uint256" }], name: "ArchiveAlreadyRevoked", type: "error" },
  { inputs: [{ internalType: "uint256", name: "id", type: "uint256" }], name: "ArchiveAlreadyVerified", type: "error" },
  { inputs: [{ internalType: "uint256", name: "id", type: "uint256" }], name: "ArchiveNotFound", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "cursor", type: "uint256" },
      { internalType: "uint256", name: "total", type: "uint256" },
    ],
    name: "CursorOutOfBounds",
    type: "error",
  },
  { inputs: [{ internalType: "string", name: "field", type: "string" }], name: "EmptyString", type: "error" },
  { inputs: [], name: "EnforcedPause", type: "error" },
  { inputs: [], name: "ExpectedPause", type: "error" },
  { inputs: [{ internalType: "uint256", name: "length", type: "uint256" }], name: "InvalidCID", type: "error" },
  { inputs: [{ internalType: "address", name: "caller", type: "address" }], name: "NotCreator", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "offset", type: "uint256" },
      { internalType: "uint256", name: "total", type: "uint256" },
    ],
    name: "OffsetOutOfBounds",
    type: "error",
  },
  { inputs: [{ internalType: "uint256", name: "limit", type: "uint256" }], name: "PageSizeExceeded", type: "error" },
  // ── Events ───────────────────────────────────────────────────────────────
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "archiveId", type: "uint256" },
      { indexed: true, internalType: "address", name: "creator", type: "address" },
      { indexed: false, internalType: "string", name: "cid", type: "string" },
      { indexed: false, internalType: "string", name: "dealId", type: "string" },
      { indexed: true, internalType: "enum VeraLayer.ArchiveType", name: "archiveType", type: "uint8" },
    ],
    name: "ArchiveCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "archiveId", type: "uint256" },
      { indexed: true, internalType: "address", name: "revokedBy", type: "address" },
    ],
    name: "ArchiveRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "archiveId", type: "uint256" },
      { indexed: true, internalType: "address", name: "verifiedBy", type: "address" },
      { indexed: false, internalType: "uint256", name: "verifiedAt", type: "uint256" },
    ],
    name: "ArchiveVerified",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
    name: "Unpaused",
    type: "event",
  },
  // ── Write functions ──────────────────────────────────────────────────────
  {
    inputs: [
      { internalType: "string", name: "cid", type: "string" },
      { internalType: "string", name: "dealId", type: "string" },
      { internalType: "enum VeraLayer.ArchiveType", name: "archiveType", type: "uint8" },
    ],
    name: "archiveData",
    outputs: [{ internalType: "uint256", name: "archiveId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "archiveId", type: "uint256" }],
    name: "revokeArchive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "archiveId", type: "uint256" }],
    name: "verifyArchive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "pause", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "unpause", outputs: [], stateMutability: "nonpayable", type: "function" },
  // ── Read functions ───────────────────────────────────────────────────────
  {
    inputs: [],
    name: "getArchiveCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "archiveId", type: "uint256" }],
    name: "getArchive",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "bytes32", name: "cidHash", type: "bytes32" },
          { internalType: "string", name: "dealId", type: "string" },
          { internalType: "enum VeraLayer.ArchiveType", name: "archiveType", type: "uint8" },
          { internalType: "uint256", name: "createdAt", type: "uint256" },
          { internalType: "uint256", name: "updatedAt", type: "uint256" },
          { internalType: "bool", name: "revoked", type: "bool" },
          { internalType: "address", name: "verifiedBy", type: "address" },
          { internalType: "uint256", name: "verifiedAt", type: "uint256" },
        ],
        internalType: "struct VeraLayer.Archive",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "afterId", type: "uint256" },
      { internalType: "uint256", name: "limit", type: "uint256" },
    ],
    name: "getArchives",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "bytes32", name: "cidHash", type: "bytes32" },
          { internalType: "string", name: "dealId", type: "string" },
          { internalType: "enum VeraLayer.ArchiveType", name: "archiveType", type: "uint8" },
          { internalType: "uint256", name: "createdAt", type: "uint256" },
          { internalType: "uint256", name: "updatedAt", type: "uint256" },
          { internalType: "bool", name: "revoked", type: "bool" },
          { internalType: "address", name: "verifiedBy", type: "address" },
          { internalType: "uint256", name: "verifiedAt", type: "uint256" },
        ],
        internalType: "struct VeraLayer.Archive[]",
        name: "results",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "creator", type: "address" }],
    name: "getArchiveIdsByCreator",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTalentArchiveCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHeritageArchiveCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "offset", type: "uint256" },
      { internalType: "uint256", name: "limit", type: "uint256" },
    ],
    name: "getTalentArchives",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "bytes32", name: "cidHash", type: "bytes32" },
          { internalType: "string", name: "dealId", type: "string" },
          { internalType: "enum VeraLayer.ArchiveType", name: "archiveType", type: "uint8" },
          { internalType: "uint256", name: "createdAt", type: "uint256" },
          { internalType: "uint256", name: "updatedAt", type: "uint256" },
          { internalType: "bool", name: "revoked", type: "bool" },
          { internalType: "address", name: "verifiedBy", type: "address" },
          { internalType: "uint256", name: "verifiedAt", type: "uint256" },
        ],
        internalType: "struct VeraLayer.Archive[]",
        name: "results",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "offset", type: "uint256" },
      { internalType: "uint256", name: "limit", type: "uint256" },
    ],
    name: "getHeritageArchives",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "bytes32", name: "cidHash", type: "bytes32" },
          { internalType: "string", name: "dealId", type: "string" },
          { internalType: "enum VeraLayer.ArchiveType", name: "archiveType", type: "uint8" },
          { internalType: "uint256", name: "createdAt", type: "uint256" },
          { internalType: "uint256", name: "updatedAt", type: "uint256" },
          { internalType: "bool", name: "revoked", type: "bool" },
          { internalType: "address", name: "verifiedBy", type: "address" },
          { internalType: "uint256", name: "verifiedAt", type: "uint256" },
        ],
        internalType: "struct VeraLayer.Archive[]",
        name: "results",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_PAGE_SIZE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_CID_LENGTH",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export enum ArchiveType {
  Talent = 0,
  Heritage = 1,
}

// backward-compat alias
export { ArchiveType as VaultType };
