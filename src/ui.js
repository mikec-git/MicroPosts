class UI {
    constructor(){
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postsubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts){
        let output = '';
        posts.forEach(post => {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-pencil-alt"></i></a>
                    <a href="#" class="delete card-link" data-id="${post.id}"><i class="fas fa-times"></i></a>
                </div>
            </div>
            `;
        });
        this.posts.innerHTML = output;
    }

    showAlert(message, className){
        this.clearAlert();
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.postsContainer');
        const posts = document.querySelector('#posts');
        container.insertBefore(div, posts);

        setTimeout(() => this.clearAlert(), 3000);
    }

    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }

    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
        this.idInput.value = '';
    }

    fillForm({id, title, body}){
        this.titleInput.value = title;
        this.bodyInput.value = body;
        this.idInput.value = id;
        this.changeFormState('edit');
    }

    removeCancelButton(){
        if(document.querySelector('.post-cancel')){
            document.querySelector('.post-cancel').remove();
        }
    }

    changeFormState(state){
        this.removeCancelButton();
        if(state === 'edit'){
            this.postsubmit.textContent = 'Update Post';
            this.postsubmit.className = 'post-submit btn btn-warning btn-block';
            
            // Create cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));
            const cardForm = document.querySelector('.card-form');
            const formEnd = document.querySelector('.form-end');
            cardForm.insertBefore(button, formEnd);
        } else{
            this.postsubmit.textContent = 'Post It';
            this.postsubmit.className = 'post-submit btn btn-primary btn-block';
            this.clearFields();
        }
    }     
}

export const ui = new UI();