import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import Loading from "../../components/shared/Loading";
import useCurrentDate from "../../hooks/useCurrentDate";
import dateComparer from "../../utilities/dateComparer";
import usePerformMutation from "../../hooks/usePerformMutation";
import NoData from "../../components/shared/NoData";
import {
  deleteTaskData,
  getTaskData,
  updateTaskData,
} from "../../api/taskAPIs";
import Title from "../../components/shared/Title/Title";
import { showToastOnError } from "../../utilities/displayToast";
import useGetMembers from "../../hooks/useGetMembers";
import { MdDescription, MdAssignment, MdLowPriority } from "react-icons/md";

const DisplayTasks = () => {
  const today = useCurrentDate();

  const priorities = ["Low", "Moderate", "High"];

  //fetching members data

  const [members, loadingMembers] = useGetMembers();

  //setting the title
  const title = {
    mainTitle: "Your Tasks",
    subTitle: "",
  };

  //fetching tasks
  const {
    isLoading,
    data: tasks,
    refetch,
  } = useQuery({
    queryKey: ["getTaskData"],
    queryFn: getTaskData,
  });

  // performing mutation for updating task data
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
    const priority = form.priority.value || "Not Found";
    const assignTo = form.assignTo.value || "Not Found";
    const deadline = form.deadline.value || "Not Found";

    const dateValidity = dateComparer(today, deadline);

    if (defaultDeadline !== deadline && dateValidity === "invalid") {
      showToastOnError("Please enter a valid date!");
    } else {
      const updatedTask = {
        title,
        description,
        priority,
        assignTo,
        deadline,
      };

      mutation1.mutate({ _id, updatedTask });
      refetch();
      form.reset();
    }
  };

  // performing mutation for deleting task data
  const mutation2 = usePerformMutation(
    "deleteTask",
    deleteTaskData,
    "Deleted successfully!"
  );

  // delete button handler
  const handleDelete = (_id) => {
    mutation2.mutate({ _id });
    refetch();
  };

  if (isLoading || loadingMembers) {
    return <Loading />;
  }

  if (tasks.length > 0) {
    return (
      <DashboardContainer>
        <Helmet>
          <title>TaskOnTime | Dashboard | Tasks</title>
        </Helmet>

        <Title title={title}></Title>

        <div className="w-[90%] overflow-y-auto h-[400px] rounded-lg">
          <table className="w-full table table-zebra rounded-lg text-base text-center">
            {/* head */}
            <thead className=" bg-[#71357B] text-base text-white font-normal text-center">
              <tr>
                <th>Title</th>
                <th>Details</th>
                <th>Priority</th>
                <th>Assigned To</th>
                <th>Deadline</th>
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
                  <td>{task.priority}</td>
                  <td>{task.assignTo}</td>
                  <td>{task.deadline}</td>
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
                                <MdDescription className="text-2xl text-white" />
                              </div>
                              <textarea
                                type="text"
                                name="description"
                                placeholder="Description"
                                required
                                defaultValue={task.description}
                                className="input bg-[#a1dada41] w-full h-20 pl-16 py-3 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              />
                            </div>

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <MdLowPriority className="text-2xl text-white" />
                              </div>
                              <select
                                type="text"
                                defaultValue={task.priority}
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
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                                <MdAssignment className="text-2xl text-white" />
                              </div>
                              <select
                                type="text"
                                defaultValue={task.assignTo}
                                name="assignTo"
                                placeholder="Assign To"
                                required
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              >
                                {members.map((member) => (
                                  <option key={member.name}>
                                    {member.name}
                                  </option>
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
                      onClick={() => handleDelete(task._id)}
                    >
                      <i className="fa-solid fa-trash group-hover:text-white "></i>
                    </button>

                    {/* <button className="btn hover:bg-[#FE7E51] group">
                      <i className="fa-solid fa-comment group-hover:text-white"></i>
                    </button> */}
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
