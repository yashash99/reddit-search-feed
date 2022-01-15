import { Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import RedditCardComponent from './reddit_card/RedditCardComponent'
import ViewCozyIcon from '@mui/icons-material/ViewCozy';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';

type FeedComponentProps = {
    data: any[]
}

export enum VIEW {
    COMPACT,
    EXPANDED1,
    EXPANDED2,
    EXPANDED3,
    SWIPE
}

function FeedComponent(props: FeedComponentProps) {
    const [view, setView] = useState(VIEW.COMPACT)

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    if (matches) {
        if (view === VIEW.EXPANDED2 || view === VIEW.EXPANDED3)
            setView(VIEW.COMPACT)
    }

    let list;
    const expandMap = new Map()
    expandMap.set(VIEW.EXPANDED1, 12)
    expandMap.set(VIEW.EXPANDED2, 4)
    expandMap.set(VIEW.EXPANDED3, 3)

    if (view === VIEW.COMPACT)

        list = props.data.map((s) => <Grid key={s.data.id} item><RedditCardComponent view={view} data={s.data} /></Grid>)
    else if ((view === VIEW.EXPANDED1 || view === VIEW.EXPANDED2 || view === VIEW.EXPANDED3))
        list = props.data.map((s) => <Grid key={s.data.id} item xs={expandMap.get(view)}><RedditCardComponent view={view} data={s.data} /></Grid>)

    return (
        <Stack mb={2} direction='column' spacing={2}>
            {matches &&
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={(e, v) => { if (v != null) setView(v) }}
                    aria-label="text alignment"
                >
                    <ToggleButton value={VIEW.COMPACT} aria-label="compact">
                        <ViewComfyIcon />
                    </ToggleButton>

                    <ToggleButton value={VIEW.EXPANDED1} aria-label="full width">
                        <ViewAgendaIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            }
            {!matches &&
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={(e, v) => { if (v != null) setView(v) }}
                    aria-label="text alignment"
                >
                    <ToggleButton value={VIEW.COMPACT} aria-label="compact">
                        <ViewComfyIcon />
                    </ToggleButton>

                    <ToggleButton value={VIEW.EXPANDED1} aria-label="full width">
                        <ViewAgendaIcon />
                    </ToggleButton>

                    <ToggleButton value={VIEW.EXPANDED2} aria-label="3 column grid">
                        <ViewColumnIcon />
                    </ToggleButton>
                    <ToggleButton value={VIEW.EXPANDED3} aria-label="4 column grid">
                        <ViewCozyIcon />
                    </ToggleButton>

                </ToggleButtonGroup>
            }
            {props.data.length > 0 &&
                <>{view === VIEW.COMPACT &&
                    <Grid container spacing={2} >
                        {list}
                    </Grid>
                }
                    {(view === VIEW.EXPANDED1 || view === VIEW.EXPANDED2 || view === VIEW.EXPANDED3) &&
                        <Grid container spacing={2} >
                            {list}
                        </Grid>
                    }</>
            }


            {props.data.length == 0 &&
                <Box>No posts</Box>
            }



        </Stack>
    )
}

export default FeedComponent
