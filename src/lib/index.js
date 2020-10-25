import "./style.less"
import PropTypes from "prop-types";
import { Input, Table, Avatar, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const baseColumns = [
    {
        title: "Avatar",
        dataIndex: "avatar_url",
        key: "avatar",
        render: src => <Avatar src={src} />
    },
    {
        title: "Name",
        dataIndex: "login",
        key: "name"
    },
    {
        title: "Repository",
        dataIndex: "html_url",
        key: "html_url",
        render: link => {
            const value = link.split("/");
            return <a target="_blank noopenner noreferrer" href={link}>Visit</a>
        },
    },
];
const GitHubUserSearch = ({ user, current, pageSize }) => {


    const [filteredData, setFilteredData] = useState(null);
    const [tableData, setTableData] = useState({ loading: true, value: [] });
    const [pagination, setPagination] = useState({
        current,
        pageSize,
        total: pageSize
    });

    useEffect(() => {
        getFollowers(user, pagination, true);
    }, []);

    async function getFollowers(user, pagination, initial) {
        // The 'initial' argument in this function is to know if it's the first time the page loads
        try {
            const { data, headers } = await axios
                .get(`https://api.github.com/users/${user}/followers?page=${pagination.current}&per_page=${pagination.pageSize}`);
            if (initial && headers.link) {
                // if it this the first time the page load and the user 'mosh-hamedani' has more than 'pagination.pageSize' followers
                const lastPage = parseInt(headers.link.split(";")[1].split("?")[1].split("&")[0].replace("page=", ""), 10);
                // the 'lastPage' gets the last page so as to get the total number of followers in the last page
                try {
                    const countTotal = await axios
                        .get(`https://api.github.com/users/${user}/followers?page=${lastPage}&per_page=${pagination.pageSize}`);
                    setPagination({ ...pagination, total: ((lastPage - 1) * pagination.pageSize) + countTotal.data.length });
                    // total number of followers is then calculated using this '((lastPage - 1) * pagination.pageSize) + countTotal.data.length'
                } catch (e) {
                    notificationOpener("error", e.response ? e.response.data.message : "");
                    setTableData({ ...tableData, loading: false });
                }
                setTableData({ ...tableData, loading: false, value: data });
            } else {
                setTableData({ ...tableData, loading: false, value: data });
                setPagination({ ...pagination })
            }
        } catch (e) {
            notificationOpener("error", e.response ? e.response.data.message : "");
            setTableData({ ...tableData, loading: false });
        }
    }

    const onChange = (pagination) => {
        setTableData({ ...tableData, loading: true });
        getFollowers(user, pagination, false)
    }

    function notificationOpener(type, message) {
        notification[type]({
            description: message ? message :
                'An Error Occured while trying to get follower, please check your network and try again',
            duration: 7

        });
    }
    const onSearch = (value) => {
        const filterTable = tableData.value.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                    .toLowerCase()
                    .includes(value.toLowerCase())
            )
        );
        console.log(filterTable)
        setFilteredData([...filterTable])
    }
    return (
        <React.Fragment>
            <Input.Search
                style={{ margin: "0 0 10px 0", width: "100%" }}
                placeholder={`Search followers of ${user} by...`}
                enterButton
                onSearch={onSearch}
            />
            <Table
                loading={tableData.loading}
                pagination={pagination}
                columns={baseColumns}
                dataSource={filteredData ? filteredData : tableData.value}
                onChange={onChange}
            />
        </React.Fragment>


    )
}

GitHubUserSearch.propTypes = {
    pageSize: PropTypes.number,
    current: PropTypes.number,
    user: PropTypes.string
}

GitHubUserSearch.defaultProps = {
    pageSize: 5,
    current: 1,
    user: "mosh-hamedani"
}

export default GitHubUserSearch;
