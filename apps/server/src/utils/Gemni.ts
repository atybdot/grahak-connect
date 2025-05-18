import {createGoogleGenerativeAI} from '@ai-sdk/google';
import { env } from 'env';
export const Gemni = createGoogleGenerativeAI({
    apiKey : env.GOOGLE_API
})