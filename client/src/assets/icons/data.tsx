import React from 'react'
import { homeThin, homeSolid } from './home'
import { exploreSolid, exploreThin } from './explore'
import { searchSolid, searchThin } from './search'
import { createPostSolid, createPostThin, photoClip } from './create-post'
import { heartPosts, heartPostsRed, heartSolid, heartThin } from './heart'
import { messageSolid, messageThin, message, messageChat } from './message'
import { reelsSolid, reelsThin } from './reels'
import { menuSolid, menuThin, setting, activity, mode, problem, saved } from './menu'
import { comment, save, share, shareFail, smile } from './posts'
import { ratioHorizontal, ratioSquare, ratioVertical, zoom } from './ratio'
import { pen, call, callVideo, info, micro, picture } from './chat'
import { logoIcon, logoText } from './logo'
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
    | 'heart-posts'
    | 'heart-posts-red'
    | 'comment'
    | 'share'
    | 'smile'
    | 'saved-posts'
    | 'message'
    | 'photo-clip'
    | 'ratio-square'
    | 'ratio-vertical'
    | 'ratio-horizontal'
    | 'zoom'
    | 'share-fail'
    | 'pen'
    | 'call'
    | 'call-video'
    | 'info'
    | 'micro'
    | 'picture'
    | 'message-chat'
    | 'logo-text'
    | 'logo-icon'
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
    'heart-posts': heartPosts,
    'heart-posts-red': heartPostsRed,
    comment,
    share,
    smile,
    'saved-posts': save,
    message,
    'photo-clip': photoClip,
    'ratio-horizontal': ratioHorizontal,
    'ratio-square': ratioSquare,
    'ratio-vertical': ratioVertical,
    zoom,
    'share-fail': shareFail,
    pen,
    call,
    'call-video': callVideo,
    info,
    micro,
    picture,
    'message-chat': messageChat,
    'logo-text': logoText,
    'logo-icon': logoIcon,
}

export default Icons
