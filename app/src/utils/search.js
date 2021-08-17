import Fuse from 'fuse.js'

const makeSearchable = (data) => {
    let searchable =
    {
        sections: data
            .map((c) =>
                c.sections.map((s) => {
                    return {
                        _id: s._id,
                        name: s.name,
                        description: s.description,
                        course: s.course_id,
                    };
                })
            )
            .flat()
            .filter(
                (section, index, self) =>
                    index === self.findIndex((s) => s._id === section._id)
            ),
        files: data
            .map((c) =>
                c.sections.map((s) =>
                    s.files.map((f) => {
                        return {
                            _id: f._id,
                            title: f.title,
                            description: f.description,
                            keywords: f.keywords,
                        };
                    })
                )
            )
            .flat()
            .flat()
            .filter(
                (file, index, self) =>
                    index === self.findIndex((f) => f._id === file._id)
            ),
        videos: data
            .map((c) =>
                c.sections.map((s) =>
                    s.videos.map((v) => {
                        return {
                            _id: v._id,
                            title: v.title,
                            description: v.description,
                            keywords: v.keywords,
                        };
                    })
                )
            )
            .flat()
            .flat()
            .filter(
                (video, index, self) =>
                    index === self.findIndex((v) => v._id === video._id)
            ),
    };
    return searchable;
}

const fuseOptions = {
    minMatchCharLength: 1,
    threshold: .4,
    includeScore: true,
}

const searchAll = (term, list) => {
    return {
        files: searchFiles(term, list.files),
        videos: searchVideos(term, list.videos),
        sections: searchSections(term, list.sections)
    }
}

const searchFiles = (term, list) => {
    const fuse = new Fuse(list, { ...fuseOptions, keys: ["title", "description", "keywords"] });
    return fuse.search(term);

};

const searchVideos = (term, list) => {
    const fuse = new Fuse(list, { ...fuseOptions, keys: ["title", "description", "keywords"] })
    return fuse.search(term);

};

const searchSections = (term, list) => {
    const fuse = new Fuse(list, { ...fuseOptions, keys: ["name", "description"] })
    return fuse.search(term);
};


export default { makeSearchable, searchAll };