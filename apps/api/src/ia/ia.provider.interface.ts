import { InjectionToken } from '@nestjs/common';

export const IA_PROVIDER = 'IA_PROVIDER' as InjectionToken;

export interface IAProvider {
  executePrompt(prompt: string, options?: any): Promise<any>;
}
