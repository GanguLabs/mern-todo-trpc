import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpxExpress from '@trpc/server/adapters/express'

export const createContext = ({req, res}: trpxExpress.CreateExpressContextOptions) => {
    const token = req.headers.authorization;

    // Validate token

    // Get  user from token

    const user = 'Truly'
    const noUser = true; // undefined;

    if(!noUser){
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Unauthorized',
        });
    }
    return {user};
}

type Context = inferAsyncReturnType<typeof createContext>;
export const trpc = initTRPC.context<Context>().create();