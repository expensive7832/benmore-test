
  // submit task
  $("#task").submit(function (e) {



    e.preventDefault()


    let form = new FormData(e.currentTarget)

    $.ajax({
      type: "post",
      url: "/",
      data: form,
      dataType: "json",
      contentType: false,
      processData: false,
      cache: false,
      beforeSend: function () {
        $("#loader").css("display", "block")
      },
      success: function (response) {

        alert("task added successfully")

        window.location.href = "/"

      },
      error: function (err) {

        $.map(err.responseJSON, function (value, prop) {
          alert(prop + " " + value)
        });
      },
      complete: function () {
        $("#loader").css("display", "none")
      }
    });

  })


  // delete task

  function deleteTask(id) {
    let confirm = window.confirm("are you sure?")

    if (confirm) {
      $.ajax({
        type: "get",
        url: `/delete/${id}`,
        dataType: "json",
        success: function (response) {
          window.location.href = "/"
        },
        error: function (err) {
          console.log(err)
        }
      });
    }
  }


   
  // update form

  $("#update").submit(function(e){

    e.preventDefault()

    let form = new FormData(e.currentTarget)


    $.ajax({
      type: "post",
      url: "/updatetask/",
      data: form,
      dataType: "json",
      contentType: false,
      processData: false,
      cache: false,

      success: function (response) {

        alert("task updated successfully")

        window.location.href = "/"

      },
      error: function (err) {

          alert(err.responseText)
      
      },
    });


  })

  // get task info
 

  function showUpdateForm(id){
    
    $.ajax({
      type: "get",
      url: "/update/"+id,
      dataType: "json",
      success: function (response) {
        $("#updateid").val(response.id)
        $("#updatetitle").val(response.title)
        $("#upddesc").val(response.desc)
        my_modal_2.showModal()
      }
    });


  }

  // fetch tasks

  $.ajax({
    type: "get",
    url: "/tasks/",
    dataType: "json",
    contentType: false,
    processData: false,
    cache: false,
    beforeSend: function () {
      $("#loader1").css("display", "block")
    },
    success: function (response) {
      let progress = response.filter((each) => each.status == "inpro")
      let complete = response.filter((each) => each.status == "comp")
      let overdue = response.filter((each) => each.status == "overdue")
      $("#text1").text(`In Progress(${progress.length})`)
      $("#text2").text(`Completed(${complete.length})`)
      $("#text3").text(`Overdue(${overdue.length})`)
      $.map(response, function (element, Key) {

        if (element.status === "inpro") {
          let task = `
     
     <div class="p-4">
           <div class="">
               
             <div class="flex px-1 justify-between items-center">
               <button class="bg-red-500 rounded-sm p-2">
                 ${element.priority}
               </button>
               <button class="bg-white shadow rounded-sm p-2">
                 ${new Date(element.due_date).toLocaleTimeString('en-GB', {
            hour: "numeric",
            hour12: true
          })}
                
               </button>
               <button class="bg-purple-100 rounded-sm p-2">
                 ${element.category}
               </button>
             </div>

               <div class="p-6 bg-gray-200">
                   
                   <h1 class="title-font text-lg font-bold text-gray-900 mb-3">${element.title}</h1>
                   <p class="leading-relaxed mb-3">${element.description}</p>
                   <div class="flex items-center flex-wrap">
                     
                     <div class="relative flex items-center">
                       
                     <i class="fa-solid fa-user rounded-full w-6 h-6 border border-gray-500 flex items-center justify-center"></i>
                     <i class="fa-solid fa-user rounded-full w-6 h-6 border border-gray-500 flex items-center justify-center"></i>
                     <i class="fa-solid fa-user rounded-full w-6 h-6 border border-gray-500 flex items-center justify-center"></i>
                     <i class="fa-solid fa-user rounded-full w-6 h-6 border border-gray-500 flex items-center justify-center"></i>
   
                     </div>

                       <span class="text-gray-400  inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm  py-1 border-r-2 border-gray-200">
                       <i class="fa-solid fa-eye"></i>
                       </span>

                       <span class="text-gray-400 mx-2 inline-flex items-center leading-none text-sm">
                      <i onclick="deleteTask(${element.id})" class="fa-solid fa-trash"></i>
                       </span>
                       
                         <button class="text-gray-500" onclick="showUpdateForm(${element.id})">
                     <i class="fa-solid fa-pen"></i>
                  </button>
                   </div>
               </div>
           </div>
       </div>

    `


          $("#progress").append(task)

        } else if (element.status === "comp") {

          let task = `
     
     <div class="p-4">
           <div class="">
               
             <div class="flex px-1 justify-between items-center">
               <button class="bg-red-500 rounded-sm p-2">
                 ${element.priority}
               </button>
               <button class="bg-white shadow rounded-sm p-2">
                 ${new Date(element.due_date).toLocaleTimeString('en-GB', {
            hour: "numeric",
            hour12: true
          })}
                
               </button>
               <button class="bg-purple-100 rounded-sm p-2">
                 ${element.category}
               </button>
             </div>

               <div class="p-6 bg-gray-200">
                   
                   <h1 class="title-font text-lg font-bold text-gray-900 mb-3">${element.title}</h1>
                   <p class="leading-relaxed mb-3">${element.description}</p>
                   <div class="flex items-center flex-wrap">
                     <div class="relative flex items-center">
                       
                     <i class="fa-solid fa-user rounded-full w-6 h-6 border border-gray-500 flex items-center justify-center"></i>
                     <i class="fa-solid fa-user rounded-full w-6 h-6 border border-gray-500 flex items-center justify-center"></i>
                     <i class="fa-solid fa-user rounded-full w-6 h-6 border border-gray-500 flex items-center justify-center"></i>
                     <i class="fa-solid fa-user rounded-full w-6 h-6 border border-gray-500 flex items-center justify-center"></i>
   
                     </div>
                       <span class="text-gray-400  inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm  py-1 border-r-2 border-gray-200">
                       <i class="fa-solid fa-eye"></i>
                       </span>

                       <span class="text-gray-400 mx-2 inline-flex items-center leading-none text-sm">
                      <i onclick="deleteTask(${element.id})" class="fa-solid fa-trash"></i>
                       </span>
                       
                        <button class="text-gray-500" onclick="showUpdateForm(${element.id})">
                     <i class="fa-solid fa-pen"></i>
                  </button>
                   </div>
               </div>
           </div>
       </div>

    `

          $("#completed").append(task)

        }
        else if (element.status === "overdue") {

          let task = `
     
     <div class="p-4">
           <div class="">
               
             <div class="flex px-1 justify-between items-center">
               <button class="bg-red-500 rounded-sm p-2">
                 ${element.priority}
               </button>
               <button class="bg-white shadow rounded-sm p-2">
                 ${new Date(element.due_date).toLocaleTimeString('en-GB', {
            hour: "numeric",
            hour12: true
          })}
                
               </button>
               <button class="bg-purple-100 rounded-sm p-2">
                 ${element.category}
               </button>
             </div>

               <div class="p-6 bg-gray-200">
                   
                   <h1 class="title-font text-lg font-bold text-gray-900 mb-3">${element.title}</h1>
                   <p class="leading-relaxed mb-3">${element.description}</p>
                   <div class="flex items-center flex-wrap">
                     
                     <div class="relative flex items-center">
                       
                     <i class="fa-solid fa-user rounded-full w-6 h-6 border border-gray-500 flex items-center justify-center"></i>
                     <i class="fa-solid fa-user rounded-full w-6 h-6 border border-gray-500 flex items-center justify-center"></i>
                     <i class="fa-solid fa-user rounded-full w-6 h-6 border border-gray-500 flex items-center justify-center"></i>
                     <i class="fa-solid fa-user rounded-full w-6 h-6 border border-gray-500 flex items-center justify-center"></i>
   
                     </div>

                       <span class="text-gray-400  inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm  py-1 border-r-2 border-gray-200">
                       <i class="fa-solid fa-eye"></i>
                       </span>

                       <span class="text-gray-400 mx-2 inline-flex items-center leading-none text-sm">
                      <i onclick="deleteTask(${element.id})" class="fa-solid fa-trash"></i>
                       </span>
                       
                       <button class=" text-gray-400" onclick="showUpdateForm(${element.id})">
                     <i class="fa-solid fa-pen"></i>
                  </button>
                       
                   </div>
               </div>
           </div>
       </div>

    `

          $("#overdue").append(task)

        }

      });

    },
    error: function (err) {

      $.map(err.responseJSON, function (value, prop) {
        alert(prop + " " + value)
      });
    },
    complete: function () {
      $("#loader1").css("display", "none")
    }
  });

  // sort

  $("#handlesort").change(function(e){

    let sel = e.target.value

    if(sel == "low"){

      
  $.ajax({
    type: "get",
    url: "/sortbylow/",
    dataType: "json",
    contentType: false,
    processData: false,
    cache: false,

    success: function (response) {
      let progress = response.filter((each) => each.status == "inpro")
      let complete = response.filter((each) => each.status == "comp")
      let overdue = response.filter((each) => each.status == "overdue")
      $("#text1").text(`In Progress(${progress.length})`)
      $("#text2").text(`Completed(${complete.length})`)
      $("#text3").text(`Overdue(${overdue.length})`)
      $.map(response, function (element, Key) {

        if (element.status === "inpro") {
          let task = `
     
     <div class="p-4">
           <div class="">
               
             <div class="flex px-1 justify-between items-center">
               <button class="bg-red-500 rounded-sm p-2">
                 ${element.priority}
               </button>
               <button class="bg-white shadow rounded-sm p-2">
                 ${new Date(element.due_date).toLocaleTimeString('en-GB', {
            hour: "numeric",
            hour12: true
          })}
                
               </button>
               <button class="bg-purple-100 rounded-sm p-2">
                 ${element.category}
               </button>
             </div>

               <div class="p-6 bg-gray-200">
                   
                   <h1 class="title-font text-lg font-bold text-gray-900 mb-3">${element.title}</h1>
                   <p class="leading-relaxed mb-3">${element.description}</p>
                   <div class="flex items-center flex-wrap">
                     
                     <div class="relative flex items-center">
                       <img class="w-6 h-6 rounded-full border-1 border-white" src="{% static 'img/user1.jpg' %}" alt="">
                       <img style="left: -0.7rem;" class="w-6 h-6 rounded-full border-1 border-white relative"
                         src="{% static 'img/user1.jpg' %}" alt="">
                       <img class="w-6 h-6 rounded-full border-1 border-white relative" style="left: -1rem;"
                         src="{% static 'img/user1.jpg' %}" alt="">
                       <img class="w-6 h-6 rounded-full border-1 border-white relative" style="left: -1.3rem;"
                         src="{% static 'img/user1.jpg' %}" alt="">
   
                     </div>

                       <span class="text-gray-400  inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm  py-1 border-r-2 border-gray-200">
                       <i class="fa-solid fa-eye"></i>
                       </span>

                       <span class="text-gray-400 mx-2 inline-flex items-center leading-none text-sm">
                      <i onclick="deleteTask(${element.id})" class="fa-solid fa-trash"></i>
                       </span>
                       
                         <button class="text-gray-500" onclick="showUpdateForm(${element.id})">
                     <i class="fa-solid fa-pen"></i>
                  </button>
                   </div>
               </div>
           </div>
       </div>

    `


          $("#progress").append(task)

        } else if (element.status === "comp") {

          let task = `
     
     <div class="p-4">
           <div class="">
               
             <div class="flex px-1 justify-between items-center">
               <button class="bg-red-500 rounded-sm p-2">
                 ${element.priority}
               </button>
               <button class="bg-white shadow rounded-sm p-2">
                 ${new Date(element.due_date).toLocaleTimeString('en-GB', {
            hour: "numeric",
            hour12: true
          })}
                
               </button>
               <button class="bg-purple-100 rounded-sm p-2">
                 ${element.category}
               </button>
             </div>

               <div class="p-6 bg-gray-200">
                   
                   <h1 class="title-font text-lg font-bold text-gray-900 mb-3">${element.title}</h1>
                   <p class="leading-relaxed mb-3">${element.description}</p>
                   <div class="flex items-center flex-wrap">
                     
                     <div class="relative flex items-center">
                       <img class="w-6 h-6 rounded-full border-1 border-white" src="{% static 'img/user1.jpg' %}" alt="">
                       <img style="left: -0.7rem;" class="w-6 h-6 rounded-full border-1 border-white relative"
                         src="{% static 'img/food.svg' %}" alt="">
                       <img class="w-6 h-6 rounded-full border-1 border-white relative" style="left: -1rem;"
                         src="{% static 'img/user1.jpg' %}" alt="">
                       <img class="w-6 h-6 rounded-full border-1 border-white relative" style="left: -1.3rem;"
                         src="{% static 'img/user1.jpg' %}" alt="">
   
                     </div>

                       <span class="text-gray-400  inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm  py-1 border-r-2 border-gray-200">
                       <i class="fa-solid fa-eye"></i>
                       </span>

                       <span class="text-gray-400 mx-2 inline-flex items-center leading-none text-sm">
                      <i onclick="deleteTask(${element.id})" class="fa-solid fa-trash"></i>
                       </span>
                       
                        <button class="text-gray-500" onclick="showUpdateForm(${element.id})">
                     <i class="fa-solid fa-pen"></i>
                  </button>
                   </div>
               </div>
           </div>
       </div>

    `

          $("#completed").append(task)

        }
        else if (element.status === "overdue") {

          let task = `
     
     <div class="p-4">
           <div class="">
               
             <div class="flex px-1 justify-between items-center">
               <button class="bg-red-500 rounded-sm p-2">
                 ${element.priority}
               </button>
               <button class="bg-white shadow rounded-sm p-2">
                 ${new Date(element.due_date).toLocaleTimeString('en-GB', {
            hour: "numeric",
            hour12: true
          })}
                
               </button>
               <button class="bg-purple-100 rounded-sm p-2">
                 ${element.category}
               </button>
             </div>

               <div class="p-6 bg-gray-200">
                   
                   <h1 class="title-font text-lg font-bold text-gray-900 mb-3">${element.title}</h1>
                   <p class="leading-relaxed mb-3">${element.description}</p>
                   <div class="flex items-center flex-wrap">
                     
                     <div class="relative flex items-center">
                       <img class="w-6 h-6 rounded-full border-1 border-white" src="{% static 'img/user1.jpg' %}" alt="">
                       <img style="left: -0.7rem;" class="w-6 h-6 rounded-full border-1 border-white relative"
                         src="{% static 'img/user1.jpg' %}" alt="">
                       <img class="w-6 h-6 rounded-full border-1 border-white relative" style="left: -1rem;"
                         src="{% static 'img/user1.jpg' %}" alt="">
                       <img class="w-6 h-6 rounded-full border-1 border-white relative" style="left: -1.3rem;"
                         src="{% static 'img/user1.jpg' %}" alt="">
   
                     </div>

                       <span class="text-gray-400  inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm  py-1 border-r-2 border-gray-200">
                       <i class="fa-solid fa-eye"></i>
                       </span>

                       <span class="text-gray-400 mx-2 inline-flex items-center leading-none text-sm">
                      <i onclick="deleteTask(${element.id})" class="fa-solid fa-trash"></i>
                       </span>
                       
                       <button class=" text-gray-400" onclick="showUpdateForm(${element.id})">
                     <i class="fa-solid fa-pen"></i>
                  </button>
                       
                   </div>
               </div>
           </div>
       </div>

    `

          $("#overdue").append(task)

        }

      });

    },
    error: function (err) {

      $.map(err.responseJSON, function (value, prop) {
        alert(prop + " " + value)
      });
    },
   
  });



    }else{



    }

  })




  // searchbox
$("#searchbtn").click(function(){
  let search = $("#search").val()
    
  $.ajax({
    type: "get",
    url: `search/${search}`,
    contentType: false,
    processData: false,
    cache: false,
    dataType: "json",
    success: function (response) {

      $("#searchbox").css("display", "block")

      if(response.length == 0){
  
        $("#searchData").text("no search result")
  
      }else{
       $.map(response, function (element, index) {
        let task = `
     
        <div class="p-4">
              <div class="">
                  
                <div class="flex px-1 justify-between items-center">
                  <button class="bg-red-500 rounded-sm p-2">
                    ${element.priority}
                  </button>
                  <button class="bg-white shadow rounded-sm p-2">
                    ${new Date(element.due_date).toLocaleTimeString('en-GB', {
               hour: "numeric",
               hour12: true
             })}
                   
                  </button>
                  <button class="bg-purple-100 rounded-sm p-2">
                    ${element.category}
                  </button>
                </div>
   
                  <div class="p-6 bg-gray-200">
                      
                      <h1 class="title-font text-lg font-bold text-gray-900 mb-3">${element.title}</h1>
                      <p class="leading-relaxed mb-3">${element.description}</p>
                      <div class="flex items-center flex-wrap">
                        
                        <div class="relative flex items-center">
                          <img class="w-6 h-6 rounded-full border-1 border-white" src="{% static 'img/user1.jpg' %}" alt="">
                          <img style="left: -0.7rem;" class="w-6 h-6 rounded-full border-1 border-white relative"
                            src="{% static 'img/user1.jpg' %}" alt="">
                          <img class="w-6 h-6 rounded-full border-1 border-white relative" style="left: -1rem;"
                            src="{% static 'img/user1.jpg' %}" alt="">
                          <img class="w-6 h-6 rounded-full border-1 border-white relative" style="left: -1.3rem;"
                            src="{% static 'img/user1.jpg' %}" alt="">
      
                        </div>
   
                          <span class="text-gray-400  inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm  py-1 border-r-2 border-gray-200">
                          <i class="fa-solid fa-eye"></i>
                          </span>
   
                          <span class="text-gray-400 mx-2 inline-flex items-center leading-none text-sm">
                         <i onclick="deleteTask(${element.id})" class="fa-solid fa-trash"></i>
                          </span>
                          
                          <button class=" text-gray-400" onclick="showUpdateForm(${element.id})">
                        <i class="fa-solid fa-pen"></i>
                     </button>
                          
                      </div>
                  </div>
              </div>
          </div>
   
       `
   
  
        $("#searchData").append(task)
       });
      }
    }
  });
})


// hide searchbox

$("#cancel").click(function(){
  $("#searchbox").css("display", "none")
})