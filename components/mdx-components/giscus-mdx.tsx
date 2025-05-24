'use client'

import Giscus from "@giscus/react"
import { useTheme } from 'next-themes'
import { useEffect, useState } from "react"


export default function GiscusMdx({
  locale,
  slug
}: {
    locale: string
    slug: string
}) {
    const { resolvedTheme } = useTheme()
    const [giscusTheme, setGiscusTheme] = useState('light')

    useEffect(() => {
        // Use resolvedTheme because "theme" can be "system"
        if (resolvedTheme === 'dark') {
        setGiscusTheme('dark')
        } else {
        setGiscusTheme('light')
        }
    }, [resolvedTheme])

    return (
        <div className="mt-10 mb-10">
            <Giscus
                id="comments"
                repo="haneure/kurisu-noatorie"
                repoId="R_kgDOOd4kpg"
                category="Announcements"
                categoryId="DIC_kwDOOd4kps4CqXVB"
                mapping="specific"
                term={slug}
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={giscusTheme}
                lang={locale}
                loading="lazy"
            />
        </div>
    )
}
