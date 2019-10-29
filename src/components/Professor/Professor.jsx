import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { withStyles } from "@material-ui/styles";

function Professor(){
    return(
        <Card className="card-container">
            <CardContent className="card-content">
                <div className="div-wrap">
                    <Avatar alt="Spiderman" src="http://2.bp.blogspot.com/-y6gRRHzE1aI/UkV3Do-lcaI/AAAAAAAAWUc/_5BwPJChM0Y/s1600/Wallpaper+Pelicula+-+Spiderman+%25284%2529.jpg"/>
                    <span className="badge-status">
                        <FontAwesomeIcon icon={faEye} className="icon" size="xs"/>
                    </span>
                    <Typography variant="h6" noWrap className="text-prof">
                        Spiderman
                    </Typography>
                </div>
                <span className="badge"></span>
            </CardContent>
        </Card>
    );
}

export default withStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#F5F5F5'
    },
    text: {
        color: '#707070'
    },
})(Professor)

