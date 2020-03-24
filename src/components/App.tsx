import * as React from "react";
import {Component} from "react";
import {Container, Grid, Paper, Typography} from "@material-ui/core";

import {PreviousQuestion} from './PreviousQuestion';
import {NextQuestion} from "./NextQuestion";
import {Question} from "./Question";
import {Score} from "./Score";
import {Judge} from "./Judge";
import {Answer} from "./Answer";
import {Speaker} from "./Speaker";

export class App extends Component<{}, {}> {
    render() {
        return (
            <Container>
                <Paper elevation={3} style={{padding: "1em"}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h1' align='center'>Bukvarko</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <PreviousQuestion/>
                        </Grid>
                        <Grid item xs={3}>
                            <Question/>
                        </Grid>

                        <Grid item xs={7}>
                            <Answer/>

                            <Speaker/>

                            <div style={{marginTop: "1em"}}>
                                <Judge/>
                            </div>
                        </Grid>

                        <Grid item xs={1}>
                            <NextQuestion/>
                        </Grid>
                    </Grid>

                    <Grid container style={{marginTop: '2em'}}>
                        <Grid item xs={12}>
                            <div style={{textAlign: "center"}}>
                                <Score/>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}
