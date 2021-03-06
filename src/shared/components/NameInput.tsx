import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import useDebounce from 'shared/hooks/useDebounce';
import { findActorByName } from 'services/actor';
import { findShowByName } from 'services/show';
import { Show } from 'shared/models/show.model';

import { sortShowsByPopularity } from 'services/utils';

import { searchTypes } from 'shared/enums/enums';

interface INameInput {
    id: string;
    name: string;
    handleChange: (value: any) => void;
    label: string;
    exampleName: string;
    setValue: (value: Show | null) => void;
    searchType: searchTypes;
    error?: string | null;  // the ? indicates that error is optional
}

function assembleHelptext(exampleName: string) {
  return `ex: "${exampleName}"`;
};

const NameInput: React.FC<INameInput> = ({ id, error, label, exampleName, setValue, searchType }) => {
  const [userInput, setUserInput] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Show[]>([]);
  const loading = open && options.length === 0;

  const debouncedUserInput = useDebounce(userInput, 250);

  const updateUserInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserInput(event.target.value as string);
  }

  React.useEffect(() => {
    if (debouncedUserInput.length >= 3) {
      (async () => {
        if (searchType === searchTypes.byActors) {
          let response = await findActorByName(debouncedUserInput); //IActor
          const actors = response.results;
          // populates the dropdown list of actors with names like the search query
          setOptions(Object.keys(actors).map(key => actors[key]) as Show[]);
        } else if (searchType === searchTypes.byShows) {
          let response = await findShowByName(debouncedUserInput); //IMovie & ITVShow
          const shows = response.results;

          let processedShows : any[] = [];
          shows.forEach((show) => {
            let formattedShow;
            if (show['media_type'] === 'movie') {
              formattedShow = {
                'id': show['id'],
                'name': show['title'],
                'date': show['release_date'],
                'popularity': show['popularity'],
                'media_type': show['media_type']
              };
            } else if (show['media_type'] === 'tv') {
              formattedShow = {
                'id': show['id'],
                'name': show['name'],
                'date': show['first_air_date'],
                'popularity': show['popularity'],
                'media_type': show['media_type']
              };
            }
            processedShows.push(formattedShow);
          });

          // put the most popular ones at top 
          processedShows = sortShowsByPopularity(processedShows);

          setOptions(Object.keys(processedShows).map(key => processedShows[key]) as Show[]);
        }
      })();
    }
  }, [debouncedUserInput, searchType]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Autocomplete
        id={id}
        className={"width100"}
        open={open}
        onOpen={() => {
          if (userInput.length >= 3) {
            setOpen(true);
          }
        }}
        onChange={(event: object, value: any, reason: string) => {
          if (value) {
            setValue(value);
          } else {
            setValue(null);
          }
        }}
        onClose={() => {
          setUserInput('');
          setOpen(false);
        }}
        getOptionSelected={(option, value) => {
          return option.name === value.name
        }}
        getOptionLabel={(option) => {
          return option?.name ? option.name : '';
        }}
        options={options}
        loading={loading}
        renderInput={params => (
          <TextField
            error={!!error}
            {...params}
            label={label}
            variant="outlined"
            helperText={assembleHelptext(exampleName)}
            value={userInput}
            onChange={updateUserInput}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    {error}
    </>
  );
}

export default NameInput;
