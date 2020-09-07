import React, {Component} from 'react';
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {Typography} from "@material-ui/core";
import {Favorite, Folder, LocationOn, Restore} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";


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

function Footer() {
    const classes = useStyles();

    const [value, setValue] = React.useState("recent");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <footer>
            <Typography variant={"h6"} align={"center"} gutterBottom>
                Footer
            </Typography>
            <BottomNavigation
                value={value}
                onChange={handleChange}
                className={classes.root}
            >


                <BottomNavigationAction
                    label={"Recents"}
                    value={"Recents"}
                    icon={<Restore/>}
                />

                <BottomNavigationAction
                    label={"Favorites"}
                    value={"Favorites"}
                    icon={<Favorite/>}
                />
                <BottomNavigationAction
                    label={"Nearby"}
                    value={"Nearby"}
                    icon={<LocationOn/>}
                />
                <BottomNavigationAction
                    label={"Folder"}
                    value={"Folder"}
                    icon={<Folder/>}
                />
            </BottomNavigation>
            <Typography align={"center"} color={"textSecondary"} component={"p"} variant={"subtitle1"}>
                Some text bottom
            </Typography>
        </footer>
    );
}

export default Footer;