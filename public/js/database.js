// Write
var txtWriteRef = document.getElementById('txtWriteRef');
var txtWriteData = document.getElementById('txtWriteData');
var btnWrite = document.getElementById('btnWrite');

// recode "data_name" and "time"
btnWrite.addEventListener('click', e => {
    let currentTime = new Date().toISOString();
    firebase.database().ref(txtWriteRef.value).push({  // set會覆蓋原本的data, push就不會覆蓋掉
        data_name: txtWriteData.value,
        time: currentTime
    }).then((snapshot) => {
        console.log("great");
        console.log("New post key:", snapshot.key);
    }).catch(e => console.log(e.message));
});

// Read
var txtReadRef = document.getElementById('txtReadRef');
var readResult = document.getElementById('readResult');
var btnRead = document.getElementById('btnRead');

// btnRead.addEventListener('click', e => {
//     firebase.database().ref(txtReadRef.value + '/data_name').once('value')
//         .then(function (snapshot) {
//             readResult.innerHTML = snapshot.val();
//             console.log("wow!");
//             console.log(snapshot);
//         })
//         .catch(e => {
//             console.log(e.message)
//         });
// });


// read all data
btnRead.addEventListener('click', e => {
    firebase.database().ref(txtReadRef.value).once('value')
        .then(function (snapshot) {
            let result = '';
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                console.log(childData.data_name);
                console.log(childData.time);
                result += (childData.data_name + " " + childData.time + '<br>');
            });
            readResult.innerHTML = result;
        })
        .catch(e => {
            console.log(e.message)
        });
});


// catch data when there is something new
firebase.database().ref(txtWriteRef.val).on('value', function (snapshot) {
    console.log("wow!");
    console.log(snapshot.val());
}, function(error) {
    console.log("Error fetching data:", error);
});
    
