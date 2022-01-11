import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import '@vime/core/themes/default.css';
import '@vime/core/themes/light.css';
import { Dash, DefaultControls, DefaultUi, Player, Video } from '@vime/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import ReactMarkdown from 'react-markdown';
//import 'swiper/css';

type RedditCardComponentProps = {
    data: any
}
function RedditCardComponent(props: RedditCardComponentProps) {
    dayjs.extend(relativeTime)

    const title = <>
        <Typography variant='subtitle2'>{props.data?.subreddit_name_prefixed}</Typography>
        <>{props.data?.title}</>
    </>
    const subheader = <>
        <Typography variant='subtitle2'>{(() => {
            const result = [dayjs.unix(props.data?.created).fromNow(), 'u/' + props.data?.author]
            if (props.data?.over_18)
                result.push('NSFW')
            return result.map((s, i, a) => i != a.length - 1 ? <Box component="span" key={s}><Typography component="span" >{s}</Typography><Typography component="span"> | </Typography></Box> : <Typography key={s} component="span">{s}</Typography>)
        })()
        }</Typography>
    </>

    /* const gallery = props.data?.is_gallery ? (function () {
        const result: JSX.Element[] = []
        if (props.data?.media_metadata) {
            const map = props.data?.media_metadata as Map<string, any>

            map.forEach((v, k) => { result.push(<SwiperSlide key={k}><img src={v.p[1].u} /></SwiperSlide>) })
            return result
        }
        return
    })() : <></> */

    return (
        <Grid item>
            <Card sx={{ maxWidth: { xs: '100%', sm: 500 }, maxHeight: 400, overflow: 'auto' }}>
                <CardHeader title={title} subheader={subheader} />
                {props.data?.post_hint === 'image' &&
                    <CardMedia component="img"
                        src={props.data?.preview.images[0].resolutions[1].url} width='100%' />
                }
                {!props.data?.preview?.reddit_video_preview && props.data?.post_hint === 'rich:video' &&
                    <CardMedia component="iframe"
                        src={props.data?.secure_media_embed.media_domain_url} width={props.data?.secure_media_embed.width} height={props.data?.secure_media_embed.height} />
                }
                {props.data?.preview?.reddit_video_preview &&
                    <CardMedia component="div">
                        <Player>
                            <Video>
                                <Dash
                                    src={props.data?.preview.reddit_video_preview.dash_url}
                                    version="latest"
                                />
                                <source data-src={props.data?.preview.reddit_video_preview.fallback_url} type="video/mp4" />
                            </Video>
                            <DefaultUi>
                                <DefaultControls hideOnMouseLeave activeDuration={2000} />
                            </DefaultUi>
                        </Player>
                    </CardMedia>
                }
                {props.data?.is_video &&
                    <CardMedia component="div">

                        <Player>
                            <Video>
                                <Dash
                                    src={props.data?.secure_media.reddit_video.dash_url}
                                    version="latest"
                                />
                                <source data-src={props.data?.secure_media.reddit_video.fallback_url} type="video/mp4" />
                            </Video>
                            <DefaultUi>
                                <DefaultControls hideOnMouseLeave activeDuration={2000} />
                            </DefaultUi>
                        </Player>
                    </CardMedia>
                }
                <CardContent>
                    {/* {props.data?.is_gallery &&
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            test
                            {gallery}
                        </Swiper>
                    } */}
                    {props.data?.is_gallery &&
                        'Todo : Gallery'
                    }
                    {props.data?.selftext && props.data?.selftext !== '' &&
                        <ReactMarkdown>{props.data?.selftext}</ReactMarkdown>
                    }
                    {props.data?.selftext && props.data?.selftext === '' &&
                        '/----/'
                    }
                    {!props.data?.preview?.reddit_video_preview && props.data?.post_hint === 'link' &&
                        <a href={props.data?.url}>{props.data?.url}</a>
                    }


                </CardContent>
            </Card>
        </Grid >
    )
}

export default RedditCardComponent
