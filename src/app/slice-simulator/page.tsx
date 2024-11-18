import { SliceSimulator, SliceSimulatorParams, getSlices } from '@slicemachine/adapter-next/simulator'
import { SliceZone } from '@prismicio/react'
import { redirect } from 'next/navigation'

import { components } from '@/slices'

export default async function SliceSimulatorPage({ searchParams }: SliceSimulatorParams & { searchParams: { secret?: string } }) {
    const params = await searchParams
    if (process.env.SLICE_SIMULATOR_SECRET && searchParams.secret !== process.env.SLICE_SIMULATOR_SECRET) {
        redirect('/')
    }

    const slices = getSlices(params.state)

    return (
        <SliceSimulator>
            <SliceZone slices={slices} components={components} />
        </SliceSimulator>
    )
}
