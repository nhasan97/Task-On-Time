import { useQuery } from "@tanstack/react-query";
// import {
//   deleteSurveyData,
//   getUserBasedSurveyData,
//   updateSurveyData,
// } from "../../api/surveyAPIs";
import { Helmet } from "react-helmet-async";
import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";
import useAuth from "../../hooks/useAuth";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import Loading from "../../components/shared/Loading";
import useCurrentDate from "../../hooks/useCurrentDate";
import dateComparer from "../../utilities/dateComparer";
import { showAlertOnError } from "../../utilities/displaySweetAlert";
import usePerformMutation from "../../hooks/usePerformMutation";
import NoData from "../../components/shared/NoData";
import { getTaskData, updateTaskData } from "../../api/taskAPIs";
import Title from "../../components/shared/Title/Title";

const DisplayTasks = () => {
  const today = useCurrentDate();

  const priorities = ["Low", "Moderate", "High"];

  //setting the title
  const title = {
    mainTitle: "Your Tasks",
    subTitle: "",
  };

  //fetching tasks based survey data
  const {
    isLoading,
    data: tasks,
    refetch,
  } = useQuery({
    queryKey: ["getTaskData"],
    queryFn: getTaskData,
  });

  // performing mutation for updating survey data
  const mutation1 = usePerformMutation(
    "updateTask",
    updateTaskData,
    "Updated successfully!"
  );

  //update button handler
  const handleUpdateTask = (e) => {
    e.preventDefault();

    const form = e.target;
    const _id = form._id.value || "Not Found";
    const defaultDeadline = form.hiddenDeadline.value || "Not Found";
    const title = form.title.value || "Not Found";
    const description = form.description.value || "Not Found";
    const deadline = form.deadline.value || "Not Found";
    const priority = form.priority.value || "Not Found";

    const dateValidity = dateComparer(today, deadline);

    if (defaultDeadline !== deadline && dateValidity === "invalid") {
      showAlertOnError("Please enter a valid date!");
    } else {
      const updatedTask = {
        title,
        description,
        deadline,
        priority,
      };

      mutation1.mutate({ _id, updatedTask });
      refetch();
      form.reset();
    }
  };

  //performing mutation for deleting survey data
  // const mutation2 = usePerformMutation(
  //   "deleteSurvey",
  //   deleteSurveyData,
  //   "Deleted successfully!"
  // );

  //delete button handler
  // const handleDelete = (_id) => {
  //   mutation2.mutate({ _id });
  //   refetch();
  // };

  if (isLoading) {
    return <Loading />;
  }

  if (tasks.length > 0) {
    return (
      <DashboardContainer>
        <Helmet>
          <title>PanaPoll | Dashboard | Surveys</title>
        </Helmet>

        <Title title={title}></Title>

        <div className="w-[90%] overflow-y-auto h-[400px] rounded-lg">
          <table className="w-full table table-zebra rounded-lg text-base text-center">
            {/* head */}
            <thead className=" bg-[#71357B] text-base text-white font-normal text-center">
              <tr>
                <th>Title</th>
                <th>Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {tasks.map((task) => (
                <tr key={task._id}>
                  <th className="text-[#71357B] text-left">{task.title}</th>
                  <td>
                    <button
                      className="btn btn-circle hover:bg-[#71357B] group"
                      onClick={() =>
                        document.getElementById(task._id).showModal()
                      }
                    >
                      <i className="fa-solid fa-circle-info group-hover:text-white"></i>
                    </button>

                    <dialog id={task._id} className="modal">
                      <div className="modal-box text-left">
                        <h3 className="font-bold text-lg">{task.title}</h3>
                        <p className="py-4 badge">{task.priority}</p>
                        <p className="py-4">{task.description}</p>
                        <p className="py-4">
                          Created On:
                          {timeStampToDateConverter(parseInt(task.timeStamp))}
                        </p>
                        <p className="py-4">Deadline: {task.deadline}</p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                  <td>{task.status}</td>
                  <td className="flex justify-center gap-3">
                    <button
                      className="btn hover:bg-emerald-500 group"
                      onClick={() =>
                        document.getElementById("u" + task._id).showModal()
                      }
                    >
                      <i className="fa-solid fa-pen-to-square group-hover:text-white"></i>
                    </button>

                    <dialog id={"u" + task._id} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <div className="p-5">
                          <form
                            className="w-full flex flex-col gap-4 text-left"
                            onSubmit={handleUpdateTask}
                          >
                            <input
                              type="text"
                              name="_id"
                              required
                              hidden
                              defaultValue={task._id}
                            />

                            <input
                              type="text"
                              name="hiddenDeadline"
                              required
                              hidden
                              defaultValue={task.deadline}
                            />

                            <input
                              type="text"
                              name="status"
                              required
                              hidden
                              defaultValue={task.status}
                            />

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-solid fa-envelope text-xl text-white"></i>
                              </div>
                              <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                required
                                defaultValue={task.title}
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              />
                            </div>

                            <div className="relative">
                              <div className="h-20 w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-solid fa-envelope text-xl text-white"></i>
                              </div>
                              <textarea
                                type="email"
                                name="description"
                                placeholder="Description"
                                required
                                defaultValue={task.description}
                                className="input bg-[#a1dada41] w-full h-20 pl-16 py-3 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              />
                            </div>

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-solid fa-envelope text-xl text-white"></i>
                              </div>
                              <select
                                type="text"
                                name="priority"
                                placeholder="Priority"
                                required
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              >
                                {priorities.map((priority) => (
                                  <option key={priority}>{priority}</option>
                                ))}
                              </select>
                            </div>

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-regular fa-calendar-days text-xl text-white"></i>
                              </div>
                              <input
                                type="date"
                                id="in4"
                                name="deadline"
                                placeholder="Deadline"
                                required
                                defaultValue={task.deadline}
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              />
                            </div>

                            <input
                              type="submit"
                              value="Update"
                              className="btn w-1/2 mx-auto bg-[#101322] text-lg font-medium text-white hover:text-[#323484] normal-case rounded-lg"
                            />
                          </form>
                        </div>
                      </div>
                    </dialog>

                    <button
                      className="btn hover:bg-red-500 group"
                      // onClick={() => handleDelete(task._id)}
                    >
                      <i className="fa-solid fa-trash group-hover:text-white "></i>
                    </button>

                    <button className="btn hover:bg-[#FE7E51] group">
                      <i className="fa-solid fa-comment group-hover:text-white"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardContainer>
    );
  } else {
    <NoData text={"No task Found"}></NoData>;
  }
};

export default DisplayTasks;
