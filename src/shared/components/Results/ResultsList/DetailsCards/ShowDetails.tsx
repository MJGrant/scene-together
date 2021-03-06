import React from 'react';
import Moment from 'react-moment';
import Avatar from '@material-ui/core/Avatar';
import { Card, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import ShowTypeIcon from 'shared/components/Results/ResultsList/DetailsCards/ShowTypeIcon';
import { blue, green } from '@material-ui/core/colors';

import ActorProfileLink from './ActorProfileLink';
import ShowDetailsLink from './ShowDetailsLink';

import './DetailsCard.css';

// define the params here 
interface IShowDetails {
  id: number;
  showName: string;
  showDate: number;
  showType: string;
  actorName1: string;
  actorName2: string;
  actorID1: number;
  actorID2: number;
  characterName1: string;
  characterName2: string;
}

const useStyles = makeStyles({
  pullLeft: {
    float: "left",
  },
  movieAvatar: {
    backgroundColor: blue[300],
  },
  tvAvatar: {
    backgroundColor: green[200],
  }
});

/* Needs a root node, so <>  </> serves that purpose here */
const ShowDetails: React.FC<IShowDetails> = ({ id, showName, showDate, showType, actorName1, actorName2, actorID1, actorID2, characterName1, characterName2 }) => {
  const classes = useStyles();

  const cardTitle = <ShowDetailsLink id={id} name={showName} showType={showType}/>;
  const cardSubheader = <span>{showType === "movie" ? "Release date:" : "First aired:"} <Moment format="MMMM D, YYYY">{showDate}</Moment></span>;

  return (
    <Card className="detailsCard">
      <CardContent>
        <CardHeader className="detailsCardHeader"
          avatar={
            <Avatar className={showType === "movie" ? classes.movieAvatar : classes.tvAvatar}>
              <ShowTypeIcon showType={showType}/>
            </Avatar>
          }
          title={cardTitle}
          subheader={cardSubheader}
        />
        <br/>
        <Typography><b>{<ActorProfileLink id={actorID1} name={actorName1}/>}</b>{characterName1 !== '' ? ` as ${characterName1}` : ''}</Typography>
        <Typography><b>{<ActorProfileLink id={actorID2} name={actorName2}/>}</b>{characterName2 !== '' ? ` as ${characterName2}` : ''}</Typography>
      </CardContent>
    </Card>
  )
}

export default ShowDetails;