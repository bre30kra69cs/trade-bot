declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEAR_PRIVATE_KEY: string;
      NEAR_PUBLIC_KEY: string;
      NEAR_ACCOUNT_ID: string;
      NEAR_SPIN_CONTRACT_ID: string;
      NEAR_TONIC_CONTRACT_ID: string;
    }
  }
}

export {};
