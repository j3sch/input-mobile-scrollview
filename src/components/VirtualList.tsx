import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, useEffect } from 'react'

interface Props {
    data: any[]
    renderItem: (item: any) => React.ReactNode
    itemHeight: number
}

export const VirtualList = ({ data, renderItem, itemHeight }: Props): React.ReactNode => {
    const parentRef = useRef()
    const count = data?.length
    const rowVirtualizer = useVirtualizer({
        count,
        getScrollElement: () => parentRef.current as any,
        estimateSize: () => itemHeight,
    })

    useEffect(() => {
        if (!rowVirtualizer || !count) return
        rowVirtualizer.scrollToIndex(count - 1)
    }, [data])

    return (
        <div
            ref={parentRef as any}
            style={{
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                overflow: 'auto', // Make it scroll!
                height: '100%',
            }}
        >
            {/* The large inner element to hold all of the items */}
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {/* Only the visible items in the virtualizer, manually positioned to be in view */}
                {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                    <div
                        key={virtualItem.key}
                        ref={rowVirtualizer.measureElement}
                        data-index={virtualItem.index}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: `translateY(${virtualItem.start}px)`,
                        }}
                    >
                        {renderItem(data[virtualItem.index])}
                    </div>
                ))}
            </div>
        </div>
    )
}
