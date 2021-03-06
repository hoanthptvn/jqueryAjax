//define global variables
var commentPostId = 1;
var commentFetching = false;
var showGoToTop = 100;
var disabledLoadMore = false;

//document ready
$(function () {
    getComments();
});

//go to top
$(window).scroll(function () {
    //show hide go to top
    var scrollTop = $(this).scrollTop();
    if (scrollTop >= showGoToTop) {
        $('#go-to-top').fadeIn();
    } else {
        $('#go-to-top').fadeOut();
    }

    //comments infinite loading
    var windowHeight = $(this).height(); // chiều cao màn hình
    var documentHeight = $(document).height(); // chiều cao tài liệu
    if ((windowHeight + scrollTop) >= (documentHeight - 150)) {
        !disabledLoadMore && commentNextPage();
    }

});

$('#go-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
})



//load data click
function commentNextPage() {
    if (commentFetching) {
        return
    }

    commentPostId++;
    getComments(commentPostId);
}

function getComments(postId) {
    if (!postId) {
        postId = 1;
    }

    var loadMoreBtn = $('.load-more-btn');
    var prevText = loadMoreBtn.text();

    //show loading
    loadMoreBtn.text('loading....');
    commentFetching = true;

    $.ajax({
        type: "get",
        url: "https://jsonplaceholder.typicode.com/comments?postId=" + postId,
        dataType: "json",
        success: function (response) {
            console.log(response);
            //auto hide .load-more-btn
            if (response.length === 0) {
                loadMoreBtn.fadeOut();
                disabledLoadMore = true;
            }

            appendComments(response);
            loadMoreBtn.text(prevText);
            commentFetching = false;
        }
    });
}

//nhan mang data
function appendComments(comments) {
    let html = '';
    $.each(comments, function (index, comment) {
        html = `<div class="card mt-4 mb-4">
                    <div class="row">
                        <div class="col-1 d-flex align-items-center justify-content-center">
                            <span class="rounded-circle d-flex align-items-center justify-content-center">${comment.id}</span>
                        </div>
                        <div class="col-11">
                            <div class="card-body">
                                <h5 class="card-title">${comment.name}</h5>
                                <p class="card-text">${comment.body}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        $('.courses-list').append(html);
    });
}