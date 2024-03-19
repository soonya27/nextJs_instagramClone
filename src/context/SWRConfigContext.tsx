'use client';

import { SWRConfig } from 'swr';

type Props = {
    children: React.ReactNode;
}

export default function SWRConfigContext({ children }: Props) {
    return <SWRConfig
        value={{
            fetcher: (resource) => fetch(resource, { cache: 'no-store' }).then(res => res.json())
        }}
    >
        {children}
    </SWRConfig>
}