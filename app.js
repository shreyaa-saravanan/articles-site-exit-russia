d3.csv("Linked_entities_articles_html_test.csv").then(function(data) {
  console.log(data);

  var articles = data;

  var button = d3.select("#button");

  var form = d3.select("#form");

  button.on("click", runEnter);
  form.on("submit", runEnter);

  function runEnter() {
    d3.select("tbody").html("")
    d3.selectAll("p").classed('noresults', true).html("")
    d3.event.preventDefault();
    var inputElement = d3.select("#user-input");
    var inputValue = inputElement.property("value").toLowerCase().trim();

    console.log(inputValue.length);
    // console.log(articles);
    if (inputValue.length < 1){
      d3.select("p").classed('noresults2', true).html("<center><strong>Please enter an actual firm name</strong>")
      inputValue = "Something to give no results"
    }
    var filteredData = articles.filter(articles => articles.token.toLowerCase().trim().includes(inputValue));
    // console.log(filteredData.length)
    if (filteredData.length === 0 && inputValue !== "Something to give no results"){
      d3.select("p").classed('noresults', true).html("<center><strong>No results. Please check your spelling!</strong>")
    }
    output = _.sortBy(filteredData, 'Entity.ID').reverse()

    for (var i = 0; i < filteredData.length; i++) {
      // console.log(output[i]['content_var'])
      // console.log(output[i]['avg_vote'])
      // d3.select("tbody>tr>td").text(output[i]['original_title']);
      // add firm name 
      d3.select("tbody").insert("tr").html(
        "<td>" + [i+1] + "</td>" +
        "<td>" + (output[i]['Article.ID'])+"</td>" +
        "<td>" + (output[i]['token'])+"</td>" +
        "<td>" + (output[i]['content_var'])+"</td>" ) }
  };
  window.resizeTo(screen.width,screen.height)


});