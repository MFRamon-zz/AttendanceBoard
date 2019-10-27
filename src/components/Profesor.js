import React, {Fragment} from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Profesor = () => {
    return (
        <Fragment>
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
        </Fragment>
    );
};

export default Profesor;
