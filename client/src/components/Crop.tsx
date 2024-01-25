import React, { useCallback, useEffect, useRef, useState } from 'react'
import AvatarEditor, { Position } from 'react-avatar-editor'
import { Icon } from '@iconify/react'
import { TypeImgCrop } from '~/types/posts'
import classNames from 'classnames'
import getSize from '~/utils/getSize'

interface Props {
    images: TypeImgCrop[]
    setImages: (value: React.SetStateAction<TypeImgCrop[]>) => void
}
const Crop: React.FC<Props> = ({ images, setImages }) => {
    const getCrop = useCallback(() => {
        if (window.innerWidth < 480)
            return {
                height: 320,
                width: 320,
            }
        else if (window.innerWidth < 1024)
            return {
                height: 400,
                width: 400,
            }
        else
            return {
                height: 520,
                width: 520,
            }
    }, [])
    const [size, setSize] = useState(getCrop())
    const [active, setActive] = useState(0)
    const [net, setNet] = useState(false)
    const [positionClient, setPositionClient] = useState({ x: 0.5, y: 0.5 })
    const [aspect, setAspect] = useState(() => {
        const aspect = images[0].aspect
        return aspect
    })
    const handleSlider = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const type = e.currentTarget.dataset['name']
        if (type === 'right') setActive((prev) => prev + 1)
        if (type === 'left') setActive((prev) => prev - 1)
    }
    const handlePosition = (position: Position) => setPositionClient(position)
    const refImg = useRef<AvatarEditor>(null)
    const handleMouseUp = useCallback(() => {
        if (refImg.current) {
            setNet(false)
            const sizeReact = refImg.current.getCroppingRect()
            setImages((prev) => {
                prev[active].serverSize = sizeReact
                prev[active].clientSize = positionClient
                return prev
            })
        }
    }, [active, positionClient, setImages])
    const handlePositionSlider = useCallback(
        (index: number) => {
            const file = images[index]
            setPositionClient(file.clientSize)
        },
        [images],
    )
    const handleAspect = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const typeAspect = event.currentTarget.dataset['aspect']
            if (!typeAspect) return
            setAspect(typeAspect)
            setImages((prev) => {
                prev.forEach((_, i) => {
                    let a = 1
                    if (typeAspect === '4/5') a = 4 / 5
                    if (typeAspect === '16/9') a = 4 / 5
                    prev[i].aspect = typeAspect
                    if (i === active) return
                    getSize(prev[i].fileCrop, (width, height) => {
                        if (width < height) {
                            prev[i].serverSize.height = (width / height) * a
                            prev[i].serverSize.width = 1
                            prev[i].serverSize.y = (1 - prev[i].serverSize.height) / 2
                            prev[i].serverSize.x = 0
                        } else {
                            prev[i].serverSize.width = (height / width) * a
                            prev[i].serverSize.height = 1
                            prev[i].serverSize.x = (1 - prev[i].serverSize.width) / 2
                            prev[i].serverSize.y = 0
                        }
                    })
                })
                return prev
            })
            let width = getCrop().width
            let height = getCrop().height
            switch (typeAspect) {
                case '4/5':
                    width *= 0.8
                    setSize({ height, width })
                    break
                case '16/9':
                    height *= 0.5625
                    setSize({ height, width })
                    break
                default:
                    setSize({ height, width })
                    break
            }
            handleMouseUp()
        },
        [setImages, getCrop, handleMouseUp, active],
    )
    useEffect(() => {
        let width = getCrop().width
        let height = getCrop().height
        switch (aspect) {
            case '4/5':
                width *= 0.8
                setSize({ height, width })
                break
            case '16/9':
                height *= 0.5625
                setSize({ height, width })
                break
            default:
                setSize({ height, width })
                break
        }
        handlePositionSlider(active)
    }, [getCrop, aspect, handlePositionSlider, active])
    const resizeCrop = useCallback(() => setSize(getCrop()), [getCrop])
    useEffect(() => {
        window.addEventListener('resize', resizeCrop)
        return () => {
            window.removeEventListener('resize', resizeCrop)
        }
    }, [resizeCrop])
    return (
        <div className='w-[320px] xs:w-[400px] lg:w-[520px] aspect-square mt-4 mx-auto'>
            <div className='relative bg-gray-100 rounded-md w-[320px] xs:w-[400px] lg:w-[520px] aspect-square mt-4 mx-auto'>
                <AvatarEditor
                    ref={refImg}
                    border={0}
                    width={size.width}
                    height={size.height}
                    className='transition-all rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                    image={images[active].fileCrop}
                    position={positionClient}
                    onMouseMove={() => setNet(true)}
                    onPositionChange={handlePosition}
                    onMouseUp={handleMouseUp}
                />
                <div
                    className={classNames('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', {
                        hidden: !net,
                    })}
                    style={{ width: size.width, height: size.height }}
                >
                    <div
                        className={`pointer-events-none inset-0 rounded-sm absolute before:absolute before:content-[''] before:w-full before:h-[1px] before:top-1/3 after:absolute after:content-[''] after:w-full after:h-[1px]  after:bottom-1/3 before:bg-gray-300 after:bg-gray-300`}
                    >
                        <div className="absolute inset-0 before:absolute before:content-[''] before:h-full before:w-[1px] before:bg-gray-300 before:left-1/3 after:absolute after:content-[''] after:h-full after:w-[1px] after:bg-gray-300 after:right-1/3"></div>
                    </div>
                </div>
                <div className={classNames({ hidden: net })}>
                    <Icon
                        onClick={handleSlider}
                        data-name='left'
                        icon='formkit:left'
                        className={classNames(
                            'absolute top-1/2 left-2 sm:left-3 md:left-4 -translate-y-1/2 text-white cursor-pointer transition-all',
                            'bg-[#333232]/60 hover:bg-[#333232]/80 p-px w-6 h-6 rounded-[50%]',
                            { hidden: active === 0 },
                        )}
                    />
                    <Icon
                        onClick={handleSlider}
                        data-name='right'
                        icon='formkit:right'
                        className={classNames(
                            'absolute top-1/2 right-2 sm:right-3 md:right-4 -translate-y-1/2 text-white cursor-pointer transition-all',
                            'bg-[#333232]/60 hover:bg-[#333232]/80 p-px w-6 h-6 rounded-[50%]',
                            { hidden: active === images.length - 1 },
                        )}
                    />
                </div>
            </div>
            <div className='flex justify-center items-center gap-8 py-3 border-y mt-2 text-gray-500'>
                <p
                    data-aspect='1'
                    onMouseDown={handleAspect}
                    onClick={handleAspect}
                    className='hover:bg-gray-100 px-2 rounded-md cursor-pointer'
                >
                    1:1
                </p>
                <p
                    data-aspect='4/5'
                    onMouseDown={handleAspect}
                    onClick={handleAspect}
                    className='hover:bg-gray-100 px-2 rounded-md cursor-pointer'
                >
                    4:5
                </p>
                <p
                    data-aspect='16/9'
                    onMouseDown={handleAspect}
                    onClick={handleAspect}
                    className='hover:bg-gray-100 px-2 rounded-md cursor-pointer'
                >
                    16:9
                </p>
            </div>
        </div>
    )
}

export default Crop
