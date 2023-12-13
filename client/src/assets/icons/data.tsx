import React from 'react'
import { homeThin, homeSolid } from './home'
import { exploreSolid, exploreThin } from './explore'
import { searchSolid, searchThin } from './search'
import { createPostSolid, createPostThin } from './create-post'
import { heartSolid, heartThin } from './heart'
import { messageSolid, messageThin } from './message'
import { reelsSolid, reelsThin } from './reels'
import { menuSolid, menuThin, setting, activity, mode, problem, saved } from './menu'
export type NameIcon =
    | 'home-thin'
    | 'home-solid'
    | 'search-thin'
    | 'search-solid'
    | 'explore-thin'
    | 'explore-solid'
    | 'reels-thin'
    | 'reels-solid'
    | 'meaagae-thin'
    | 'message-solid'
    | 'heart-thin'
    | 'heart-solid'
    | 'create-post-thin'
    | 'create-post-solid'
    | 'menu-thin'
    | 'menu-solid'
    | 'setting'
    | 'activity'
    | 'mode'
    | 'saved'
    | 'problem'
const Icons: Record<NameIcon, React.ReactNode> = {
    'home-thin': homeThin,
    'home-solid': homeSolid,
    'explore-solid': exploreThin,
    'explore-thin': exploreSolid,
    'search-solid': searchSolid,
    'search-thin': searchThin,
    'create-post-solid': createPostSolid,
    'create-post-thin': createPostThin,
    'heart-solid': heartSolid,
    'heart-thin': heartThin,
    'meaagae-thin': messageThin,
    'message-solid': messageSolid,
    'reels-solid': reelsSolid,
    'reels-thin': reelsThin,
    'menu-solid': menuSolid,
    'menu-thin': menuThin,
    setting,
    activity,
    mode,
    problem,
    saved,
}

export default Icons
