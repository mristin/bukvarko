import * as React from "react";
import {Component} from "react";
import yellow from "@material-ui/core/colors/yellow";
import grey from "@material-ui/core/colors/grey";
import {Container, Grid, IconButton, Paper, TextField, Typography} from "@material-ui/core";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ArrowRight from "@material-ui/icons/ArrowRight";
import Star from "@material-ui/icons/Star";

type State = {};

type Props = {};

export class App extends Component<Props, State> {
    // TODO: move to a separate module; handle interruptions
    voice() {
        const u = new SpeechSynthesisUtterance();
        u.text = "Ti si napisao: slon.";
        u.lang = "sr-RS";
        u.volume = 1; // 0 to 1
        u.rate = 0.7; // 0.1 to 1
        u.pitch = 2; //0 to 2

        speechSynthesis.speak(u);
    }

    render() {
        const hit = {color: yellow[700]};
        const miss = {color: grey[500]};

        return (
            <Container>
                <Paper elevation={3} style={{padding: "1em"}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h1' align='center'>Bukvarko</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton>
                                <ArrowLeft fontSize='large'/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <img src="./media/slon.jpeg" alt="Slon" style={{width: "90%", border: "1px solid black"}}/>
                        </Grid>

                        <Grid item xs={7}>
                            <TextField variant="outlined" inputProps={{
                                maxLength: 30, size: 30
                            }}/>

                            <IconButton style={{marginLeft: "1em"}} onClick={this.voice}>
                                <RecordVoiceOver/>
                            </IconButton>

                            <div style={{marginTop: "1em"}}>
                                <ThumbUp style={{color: "green"}}/>
                                <ThumbDown style={{color: "red"}}/>
                            </div>
                        </Grid>

                        <Grid item xs={1}>
                            <IconButton>
                                <ArrowRight fontSize='large'/>
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid container style={{marginTop: '2em'}}>
                        <Grid item xs={12} alignContent="center">
                            <Star style={hit}/>
                            <Star style={miss}/>
                            <Star style={miss}/>
                            <Star style={hit}/>
                            <Star style={hit}/>
                            <Star style={hit}/>
                            <Star style={hit}/>
                            <Star style={hit}/>
                            <Star style={hit}/>
                            <Star style={hit}/>
                            <Star style={hit}/>
                            <Star style={hit}/>
                            <Star style={hit}/>
                            <Star style={hit}/>
                            <Star style={hit}/>
                            <Star style={hit}/>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}
