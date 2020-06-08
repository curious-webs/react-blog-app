export function paginate(items, currenPage, postsPerPage) {
  currenPage = currenPage || 1;
  postsPerPage = postsPerPage || 10;
  var offset = (currenPage - 1) * postsPerPage,
    paginatedItems = items.slice(offset).slice(0, postsPerPage),
    total_pages = Math.ceil(items.length / postsPerPage);
  return {
    currenPage: currenPage,
    postsPerPage: postsPerPage,
    pre_page: currenPage - 1 ? currenPage - 1 : null,
    next_page: total_pages > currenPage ? currenPage + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
}
