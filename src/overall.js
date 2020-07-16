import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
    0.5: 'Worst experience in my life!!',
    1: 'Will never go back',
    1.5: 'Just bad',
    2: "Don't recommend it",
    2.5: 'Just ok',
    3: 'They really try',
    3.5: 'Good',
    4: 'Very Good',
    4.5: 'Excellent',
    5: 'Absolutely amazing!!',
};

const useStyles = makeStyles({
    root: {
        width: 200,
        // display: 'flex',
        alignItems: 'center',
    },
});

export default function Overall() {
    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();

    console.log('value Overall: ', value);

    return (
        <div className={classes.root}>
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
        </div>
    );
}
