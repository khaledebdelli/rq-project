import axios from "axios";
import { useQuery } from "react-query";

const fetchUser = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};
const fetchChannel = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};
export const DependentQueryPage = ({ email }) => {
  const {data: user} = useQuery(['rq-user', email], () => fetchUser(email))
  const channelId = user?.data.channelId
  const {data: channel} = useQuery(['rq-channel', channelId], () => fetchChannel(channelId), {
    enabled: !!channelId
  });
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div key={user?.data.id}>
        <div>{user?.data.id}</div>
      </div>
      <div key={channel?.data.id}>
        {channel?.data.courses.map((course) => {
          return <div key={course}>{course}</div>
        })}
      </div>
    </>
  );
};
