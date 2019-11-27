import React, {Fragment} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Profesor = ({active, image, name, status }) => {
    if(name){
        if(name.length > 18){
            name = name.substr(0, 18)
            name = name+"..."
        }
    } else {
        name = null
    }
    return (
        <Fragment>
            <Card className={active ? "card-container-active" : "card-container"}>
                <CardContent className="card-content">
                    <div className="div-wrap">
                        <Avatar alt="Spiderman" src={image}/>
                        {active ?   <span className="badge-status">
                                        <FontAwesomeIcon icon={faEye} className="icon" size="xs"/>
                                    </span> : null}
                        <Typography variant="h6" noWrap className="text-prof">
                            {name}
                        </Typography>
                    </div>
                    <span className={status ? "badge" : "badge-red"}></span>
                </CardContent>
            </Card>
        </Fragment>
    );
};

export default Profesor;
