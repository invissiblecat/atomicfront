import { BigNumber } from "ethers";
import { CurrencyTicket } from "../constants";
import { State } from "../services/root.contract";

export type TProject = {
  title: string;
  logo?: string;
};

export type TRawProject = {
  id: string;
  blockchainId: number;
  title: string;
  description: string;
  exchangeRate: string;
  whitelistStartDate: number;
  whitelistEndDate: number;
  swapStartDate: number;
  swapEndDate: number;
  fcfsEndDate: number;
  fcfsMaxCount: string;
  totalRaise: string;
  whitelistCount: string;
  idoBannerUrl?: string;
  idoLogoUrl?: string;
  tokenLogoUrl: string;
  network: string;
  claimType: string;
  payments: TPayments[];
  vestingSchendule: string;
  exchangeCurrency?: TCurrencyData[];
  claimCurrency?: TCurrencyData[];
  applications?: TApplication[];
  status: TState;
  invested: string | "";
  links?: Link[];
};

export enum SocailLinkName {
  Telegram = "telegram",
  Twitter = "twitter",
  Website = "website",
  Discord = "discord",
  Instagram = "instagram",
  Medium = "medium",
  Document = "document",
  Bscscan = "bscscan",
}

export enum DocsLinkName {
  Pitchdeck = "pitchdeck",
  Whitepaper = "whitepaper",
  Tokenomics = "tokenomics",
}

export type Link = {
  id: string;
  idoId: string;
  name: SocailLinkName & DocsLinkName; // неверно, но пока не знаю как сделать лучше
  link: string;
  isTask: boolean;
  applicationLinkStatuses?: LinkStatus[];
};

export type LinkStatus = {
  id: string;
  applicationId: string;
  linkId: string;
  handle: string;
  status: string;
};

export type TState =
  | "not deployed"
  | "upcoming"
  | "redeem"
  | "fcfs"
  | "claim"
  | "distributed";

export type TPayments = {
  date: number;
  percent: number;
};

export type TDefaultData = {};

export type TDefaultMeta = {};

export type TStatus = "success" | "pending" | "idle" | "reject";

export type TInvestorInfo = {
  amount: BigNumber;
  redeemed: BigNumber;
  claimedCount: number;
  totalInvested: BigNumber;
  availableBalance: BigNumber;
  state: State;
  claimed: BigNumber;
  totalToClaim: BigNumber;
  isAvailableToClaim: boolean;
  nextClaimIndex: number;
  availableToClaim: BigNumber;
};

export type TApplication = {
  id: number;
  userId: string;
  idoId: number;
  amount: string;
  status: "inreview" | "approved" | "rejected";
  fcfsAmount: string;
};

export type TCurrencyData = {
  ticket: CurrencyTicket;
  address: string;
};

/**
 * @param accessExpiresIn in milliseconds
 * @param refreshExpiresIn in milliseconds
 */
export type Tokens = {
  refreshToken: string;
  accessToken: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
};

export type User = {
  ethAddres: string;
  kycStatus: string;
  twitterHandle: string;
  telegramHandle: string;
  snsStatus: string;
  applications?: TApplication[];
};

export enum TimelineStages {
  TBA,
  UPCOMING,
  SWAP,
  FCFS,
  FILLED,
  CLAIMABLE,
  ENDED,
}

export enum ProjectStages {
  whitelistTba = 1, // дата whitelist неизвестна
  whitelistGap, // дата whitelist известна, но не наступила
  whitelist, // whitelist открыт
  swapGap, // whitelist закрыт, но лотерея не проведена
  swapGapWithResults, // whitelist закрыт, лотерея проведена, но дата swap не наступила
  swap, // swap начался
  fcfs, // swap закончился, fcfs начался
  claimGap, // fcfs закончился, дата claim не наступила
  claim, // claim начался
  ended,
}

export enum ApplicationStatus {
  notCreated = 1,
  rejected,
  interview,
  approved,
  win,
  lose,
}

export enum SwapStages {
  S1_SWAP_GAP_HAS_NO_APP = 1,
  S2_SWAP_GAP_HAS_APP,
  S3_SWAP_GAP_WITH_RESULTS_HAS_NO_APP,
  S4_SWAP_GAP_WITH_RESULTS_WIN,
  S5_SWAP_GAP_WITH_RESULTS_LOSE,
  S6_SWAP_HAS_NO_APP,
  S7_SWAP_LOSE,
  S8_SWAP_WIN_NOT_REDEEM,
  S9_SWAP_WIN_REDEEM,
}

export enum FcfsStages {
  F1_HAS_NO_APP = 1,
  F2_HAS_APP_NOT_REDEEM,
  F3_HAS_APP_REDEEM,
}
