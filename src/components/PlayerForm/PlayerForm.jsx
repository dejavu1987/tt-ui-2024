import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import configs from "../../configs";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

const PlayerForm = ({ id }) => {
  const { register, handleSubmit, errors } = useForm();
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
    <div className="container mx-auto px-4">
      <h2 className="h2">{(id && `Edit ${player.name}`) || "Add player"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <div className="border flex flex-col">
              <input
                type="text"
                name="id"
                id="id"
                label="ID"
                defaultValue={player.id}
                {...register("id", { required: true })}
              />
              <input
                type="text"
                name="uuid"
                label="NUID"
                icon="fingerprint"
                type="text"
                defaultValue={player.uuid}
                {...register("uuid", { required: true })}
              />
            </div>
            <div className="border flex flex-col">
              <input
                type="text"
                name="name"
                label="Short Name"
                defaultValue={player.name}
                {...register("name", { required: true })}
              />
              <input
                type="text"
                name="photo"
                label="Url to a photo"
                defaultValue={player.photo}
                {...register("photo")}
              />
              <input
                type="text"
                name="fullName"
                label="Full Name"
                defaultValue={player.fullName}
                {...register("fullName")}
              />
              <input
                type="text"
                name="profession"
                label="Profession"
                defaultValue={player.profession}
                {...register("profession")}
              />
              <input
                type="text"
                name="nationality"
                label="Nationality"
                defaultValue={player.nationality}
                {...register("nationality", {
                  required: true,
                  pattern: /^[a-z]{2}$/,
                })}
              />
            </div>
            <div className="border flex flex-col">
              <textarea
                defaultValue={player.hobbies}
                rows={4}
                name="hobbies"
                label="Hobbies"
                {...register("hobbies")}
              ></textarea>
            </div>
            <button type="submit">Save</button>
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
