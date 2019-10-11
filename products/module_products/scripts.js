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
    
    getDrop();
    getData();
    setupValidation()

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
});

function getDrop(){
    $.post('../.../products/module_products/main.php',{method:'get'},function(e){
        var datosDrop = [];
        values = e;
        $.each(e,function(index,value){
            var obj = {
                id:value.id,
                text:value.name
            };
            datosDrop.push(obj);
        });

        $('#name').select2({
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
        'name':$('#name').val(),
        'brand_id':$('#brand_id').val(),
        'type_id':$('#type_id').val(),
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
        $('#Ename').val(e[0].name),
        $('#Ebrand_id').val(e[0].name),
        $('#Etype_id').val(e[0].name);
        $('#editModal').modal();
        setupModalValidation();
    });
    
}

function updateData() {
    var newRow = {
        'id':editId,
        'name':$('#Ename').val(),
        'brand_id':$('#Ebrand_id').val(),
        'type_id':$('#Etype_id').val(),
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

var data = [];

var columns = [{
    title: 'Nombre de la marca del producto',
    data: 'name'
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
            name:{
                required:true
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
            Ename:{
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