import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import configs from "../../configs";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import {
  Button,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import FaceIcon from "@material-ui/icons/Face";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import PublicIcon from "@material-ui/icons/Public";
import WorkIcon from "@material-ui/icons/Work";

const useStyles = makeStyles(() => {
  return {
    field: {
      margin: 10,
    },
  };
});
const PlayerForm = ({ id }) => {
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();
  const [player, setPlayer] = useState({});
  const history = useHistory();
  const API = configs.apiUrl + "/api/player";

  useEffect(() => {
    if (id) {
      console.log({ id });
      fetch(`${API}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log({ data });
          setPlayer(data.player);
        });
    }
  }, [id]);

  function onSubmit(data) {
    console.log({ data });

    fetch(`${configs.apiUrl}/api/player${id ? `/${id}` : ""}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        history.push("/player/" + data.id);
      })
      .catch((e) => {
        console.log({ e });
      });
  }
  if (id && !player.id) return "";
  return (
    <div className="container">
      <h2>{(id && `Edit ${player.name}`) || "Add player"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <TextField
                className={classes.field}
                error={!!errors.id}
                name="id"
                id="id"
                label="ID"
                defaultValue={player.id}
                inputRef={register({ required: true })}
                helperText={errors.id && "This field is required"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaymentIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.field}
                name="uuid"
                label="NUID"
                icon="fingerprint"
                type="text"
                defaultValue={player.uuid}
                inputRef={register()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FingerprintIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="form-group">
              <TextField
                className={classes.field}
                name="name"
                error={!!errors.name}
                label="Short Name"
                defaultValue={player.name}
                inputRef={register({ required: true })}
                helperText={errors.name && "This field is required"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaceIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.field}
                name="photo"
                error={!!errors.photo}
                label="Url to a photo"
                defaultValue={player.photo}
                inputRef={register()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaceIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.field}
                name="fullName"
                label="Full Name"
                defaultValue={player.fullName}
                inputRef={register()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaceIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.field}
                name="profession"
                label="Profession"
                inputRef={register()}
                defaultValue={player.profession}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.field}
                name="nationality"
                label="Nationality"
                defaultValue={player.nationality}
                error={!!errors.nationality}
                helperText={errors.nationality && 'Check this field, Eg: "de"'}
                inputRef={register({ pattern: /^[a-z]{2}$/ })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="form-group">
              <TextField
                className={classes.field}
                multiline
                defaultValue={player.hobbies}
                rows={4}
                name="hobbies"
                label="Hobbies"
                inputRef={register()}
              />
            </div>
            <Button color="primary" type="submit" variant="outlined">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

PlayerForm.propTypes = {
  id: PropTypes.string,
};

export default PlayerForm;
