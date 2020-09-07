import React from 'react';
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing()
        },
        title: {
            flexGrow: 1
        }
    })
);

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position='fixed'>
            <Container fixed>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"}
                                aria-label={"menu"} className={classes.menuButton}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant={"h6"}
                                className={classes.title}>
                        Collections
                    </Typography>
                    <Box mx={3}>
                        <Button color={"inherit"} variant={"outlined"}
                                to={"/login"} component={Link}>
                            Log In
                        </Button>
                    </Box>
                        <Button color={"secondary"} variant={"contained"}
                                to={"/sign-up"} component={Link}>
                            Sign Up
                        </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;