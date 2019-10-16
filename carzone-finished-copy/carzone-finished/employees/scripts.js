$.extend($.validator.messages,{
    required: "El campo es obligatorio",
    remote: "Please fix this field.",
    email: "Wrong email.",
    url: "Please enter a valid URL.",
    date: "Fecha inválida",
    dateISO: "Please enter a valid date (ISO).",
    number: "El campo debe ser numérico",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    maxlength: $.validator.format("Ingresar menos de {0} caracteres."),
    minlength: $.validator.format("Ingresa al menos {0} caracteres."),
    rangelength: $.validator.format("Usa un valor en el rango {0} y {1} "),
    range: $.validator.format("Please enter a value between {0} and {1}."),
    max: $.validator.format("Please enter a value less than or equal to {0}."),
    min: $.validator.format("Please enter a value greater than or equal to {0}.")
})

var na = document.getElementById('name');
$(document).ready(function(){
    setDatepicker();
    getData();
    setupValidation();
    getDrop();
    getDrop1();

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
});

function getDrop(){
    $.post('../.../titles/module_titles/main.php',{method:'get'},function(e){
        var datosDrop = [];
        values = e;
        $.each(e,function(index,value){
            var obj = {
                id:value.id,
                text:value.name
            };
            datosDrop.push(obj);
        });

        $('#title').select2({
            placeholder: 'Seleccione un maestro',
            data:datosDrop,
            theme: "bootstrap4",
            width: 'element'
        });
    });
}

function getDrop1(){
    $.post('../.../stores/module_stores/main.php',{method:'get'},function(e){
        var datosDrop = [];
        values = e;
        $.each(e,function(index,value){
            var obj = {
                id:value.id,
                text:value.name
            };
            datosDrop.push(obj);
        });

        $('#store').select2({
            placeholder: 'Seleccione un maestro',
            data:datosDrop,
            theme: "bootstrap4",
            width: 'element'
        });
    });
}

function getData() {
    $.post('main.php',{method:'get'},function(data){
        setDataTable(data);
    });
}

function addData(){
    var newRow = {
        'first_name':$('#firstname').val(),
        'last_name':$('#lastname').val(),
        'telephone':$('#telephone').val(),
        'birthdate' :$('#birthdate').val(),
        'email':$('#email').val(),
        'title_id' :$('#title').val(),
        'store_id' :$('#store').val()

    }
    console.log(newRow);

    $.post('main.php',{method:'insert',data:newRow},function(e){
        
        getData();
        $('#frm')[0].reset();
    });
}

function deleteData(id){
    $.post('main.php',{method:'delete',data:{id:id}},function(e){
        getData();
    });
}

function editRow(id){
    editId = id;
    $.post('main.php',{method:'show',data:{id:id}},function(e){
        console.log(e)
        
        $('#Efirstname').val(e[0].first_name);
        $('#Elastname').val(e[0].last_name);
        $('#Etelephone').val(e[0].telephone);
        $('#Ebirthdate').val(e[0].birthdate);
        $('#Eemail').val(e[0].email);
        $('#Etitle').val(e[0].title_id);
        $('#Estore').val(e[0].store_id)
        $('#editModal').modal();
        setupModalValidation();
    });
    
}

function updateData() {
    var newRow = {
        'id':editId,
        'first_name':$('#Efirstname').val(),
        'last_name':$('#Elastname').val(),
        'telephone':$('#Etelephone').val(),
        'birthdate' :$('#Ebirthdate').val(),
        'email':$('#Eemail').val(),
        'title_id' :$('#Etitle').val(),
        'store_id' :$('#Estore').val()
    }
    
    $.post('main.php',{method:'update',data:newRow},function(e){
        console.log(newRow);
        $('#editModal').modal('toggle');
        getData();
        $.notify({
            // options
            message: 'Datos actualizados con éxito' 
        },{
            // settings
            type: 'success'
        });
    });
    
}


function setDatepicker() {
    $('#birthdate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'es'
    });
    $('#Ebirthdate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'es'
    });
}

var data = [];

var columns = [{
    title: 'Nombre del empleado',
    data: 'first_name'
},
{
    title: 'Apellido',
    data: 'last_name'

},
{
    title: 'Email',
    data: 'email'

},
{
    title: 'Telefono',
    data: 'telephone'

},
{
    title: 'Fecha de nacimiento',
    data : 'birthdate'
},
{
    title: 'Puesto',
    data: 'title_id'
},
{
    title: 'Tienda',
    data: 'store_id'
},
{
    title: 'Acciones',
    data:'id',
    render: function(e){
        return '<button type="button" onclick="deleteData('+e+')" class="btn btn-danger"><i class="fas fa-trash"></i></button>' + '<button type="button" onclick="editRow('+e+')" class="btn btn-success"><i class="fas fa-edit"></i></button>';
    }
}
];

function setDataTable(data){
    $('#tbl').DataTable({
        dom: 'Bfrtip',
        data: data,
        columns: columns,
        destroy: true,

        language: {
            url: '../json/es.json'
        },
        
        buttons: [
            'excel', 'pdf'
        ]
    });
}

function setupValidation(){
    $('#frm').validate({
        rules:{
            firstname:{
                required:true
            },
            lastname:{
                required:true
            },
            email:{
                required:true
            },
            telephone:{
                required:true
            },
            birthdate: {
                required: true
            },
            title: {
                required: true
            },
            store: {
                required: true
            }
        },
        submitHandler: function(form){
            addData();
        },
        invalidHandler:function(form){
            $.notify({
                // options
                message: 'Introduce bien los datos' 
            },{
                // settings
                type: 'danger'
            });
        }
    });
}

function setupModalValidation(){
    $('#Efrm').validate({
        rules:{
            Efirstname:{
                required:true
            },
            Elastname:{
                required:true
            },
            Eemail:{
                required:true
            },
            Etelephone:{
                required:true
            },
            Ebirthdate:{
                required:true
            },
            Etitle:{
                required:true
            },
            Estore:{
                required:true
            }

        },
        submitHandler: function(form){
            updateData();
        },
        invalidHandler:function(form){
            $.notify({
                // options
                message: 'Introduce bien los datos' 
            },{
                // settings
                type: 'danger'
            });
        }
    });
}