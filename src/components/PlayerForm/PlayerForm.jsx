import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import configs from "../../configs";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

const PlayerForm = ({ id }) => {
  const { register, handleSubmit, formState } = useForm();
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
  // if (id && !player.id) return "";
  return (
    <div className="main-container">
      <h2 className="h2">{(id && `Edit ${player.name}`) || "Add player"}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="border flex flex-col p-4">
            <label htmlFor="id">
              ID:{" "}
              <input type="text" defaultValue={player.id} {...register("id")} />
              {formState.errors.id && <span>This field is required</span>}
            </label>
            <label htmlFor="uuid">
              UUID:{" "}
              <input
                type="text"
                defaultValue={player.uuid}
                {...register("uuid")}
              />
              {formState.errors.uuid && <span>This field is required</span>}
            </label>
          </div>
          <div className="border flex flex-col p-4">
            <label>
              Name:{" "}
              <input
                type="text"
                defaultValue={player.name}
                {...register("name")}
              />
              {formState.errors.name && <span>This field is required</span>}
            </label>
            <label>
              Photo:{" "}
              <input
                type="text"
                name="photo"
                label="Url to a photo"
                defaultValue={player.photo}
                {...register("photo")}
              />
            </label>
            <label>
              Full Name:
              <input
                type="text"
                id="fullName"
                defaultValue={player.fullName}
                {...register("fullName")}
              />
            </label>

            <label htmlFor="profession">
              Profession:{" "}
              <input
                type="text"
                defaultValue={player.profession}
                {...register("profession")}
              />
            </label>
            <label htmlFor="nationality">
              Nationality:{" "}
              <input
                type="text"
                defaultValue={player.nationality}
                {...register("nationality", {
                  pattern: /^[a-z]{2}$/,
                })}
              />
              {formState.errors.nationality && (
                <span>This field is required</span>
              )}
            </label>
          </div>
          <div className="border flex flex-col p-4">
            <label htmlFor="hobbies">
              Hobbies:{" "}
              <textarea
                defaultValue={player.hobbies}
                rows={4}
                {...register("hobbies")}
              ></textarea>
            </label>
          </div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

PlayerForm.propTypes = {
  id: PropTypes.string,
};

export default PlayerForm;
