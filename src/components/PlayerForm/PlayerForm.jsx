import PropTypes from "prop-types";
import configs from "../../configs";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

const API = configs.apiUrl + "/api/player";

const PlayerForm = ({ id }) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: id
      ? async () =>
          fetch(`${API}/${id}`)
            .then((response) => response.json())
            .then((data) => {
              return data.player;
            })
      : {},
  });
  const history = useHistory();

  function onSubmit(data) {
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

  return (
    <div className="main-container">
      <h2 className="h2">{(id && `Edit player`) || "Add player"}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 max-w-screen-sm mx-auto">
          <div className="border flex flex-col p-4">
            <label className="flex w-full my-1 justify-between" htmlFor="id">
              ID: <input className="w-2/3" type="text" {...register("id")} />
              {formState.errors.id && <span>This field is required</span>}
            </label>
            <label className="flex w-full my-1 justify-between" htmlFor="uuid">
              UUID:{" "}
              <input className="w-2/3" type="text" {...register("uuid")} />
              {formState.errors.uuid && <span>This field is required</span>}
            </label>
          </div>
          <div className="border flex flex-col p-4">
            <label className="flex w-full my-1 justify-between">
              Name:{" "}
              <input className="w-2/3" type="text" {...register("name")} />
              {formState.errors.name && <span>This field is required</span>}
            </label>
            <label className="flex w-full my-1 justify-between">
              Photo:{" "}
              <input className="w-2/3" type="text" {...register("photo")} />
            </label>
            <label className="flex w-full my-1 justify-between">
              Full Name:
              <input className="w-2/3" type="text" {...register("fullName")} />
            </label>

            <label
              className="flex w-full my-1 justify-between"
              htmlFor="profession"
            >
              Profession:{" "}
              <input
                className="w-2/3"
                type="text"
                {...register("profession")}
              />
            </label>
            <label
              className="flex w-full my-1 justify-between"
              htmlFor="nationality"
            >
              Nationality:{" "}
              <input
                className="w-2/3"
                type="text"
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
            <label
              className="flex w-full my-1 justify-between"
              htmlFor="hobbies"
            >
              Hobbies:{" "}
              <textarea
                className="border w-2/3 "
                rows={4}
                {...register("hobbies")}
              ></textarea>
            </label>
          </div>
          <button className="button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

PlayerForm.propTypes = {
  id: PropTypes.string,
};

export default PlayerForm;
