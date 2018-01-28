module.exports = {
    returnPage: function (count, data) {
        data.count = count;
        data.pages = Math.ceil(count / data.limit);
        //page不能小于1并且不能大于总页数
        data.page = Math.max(1, data.page);
        data.page = Math.min(data.pages, data.page);

        data.skip = (data.page-1) * data.limit;

    return data;
}
};