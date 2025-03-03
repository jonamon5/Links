// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown

// https://api.are.na/v2/channels/illusion-v0vgfx61y_e

let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

// Okay, Are.na stuff!
let channelSlug = 'illusion-v0vgfx61y_e'


// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	let channelTitle = document.createElement("channel-title")
	let channelDescription = document.createElement("channel-description")
	let channelCount = document.createElement("channel-count")
	let channelLink = document.createElement("channel-link")

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	channelCount.innerHTML = data.length
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}


// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.getElementById('channel-blocks')

	// Links!
	if (block.class == 'Link') {
		let linkItem =
			`
			<div class="block" id="block-${block.id}">
		  	<img src="${block.image.original.url}">
			</div>
		`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)

		document.getElementById(`block-${block.id}`).addEventListener('click', () => {
			let modalContent = document.getElementById('modal-content');
			modalContent.innerHTML = ''; //empty this before next content is inserted; prevent potential errors
			modalContent.innerHTML = `
			<div class = "modal-container" > 
				<img src="${block.image.original.url}" alt="${block.title}">
				<h2 class="modal-title">${block.title}</h2>
				<p class="modal-desc">${(block.description) ? block.description : "No Description Provided"}</p> 
			</div>
			`;
			document.getElementById('modal').showModal(); //showModal is built in dialog element

		});
	}

	// Images!

	else if (block.class == 'Image') {

		// this shows on main page
		let imageItem = `
		<div class="block image-block" id="block-${block.id}">
		  <img src="${block.image.original.url}">
		</div>
		`;
		channelBlocks.insertAdjacentHTML('beforeend', imageItem);

		// modal for images - attaching block.id to each block because I plan to swap the divs with one another in the future, so I will need a unique ID to retrieve that info later. Using something like last-element-child will mostly not worth with my future plans. More work here tho...

		document.getElementById(`block-${block.id}`).addEventListener('click', () => {
			let modalContent = document.getElementById('modal-content');
			modalContent.innerHTML = ''; //empty this before next content is inserted; prevent potential errors
			modalContent.innerHTML = `
			<div class = "modal-container" > 
				<img src="${block.image.original.url}" alt="${block.title}">
				<h2 class="modal-title">${block.title}</h2>
				<p class="modal-desc">${(block.description) ? block.description : "No Description Provided"}</p> 
			</div>
			`;
			document.getElementById('modal').showModal(); //showModal is built in dialog element

		});
	}


	// Text!
	else if (block.class == 'Text') {
		let textItem = `
		<div class="block" id="block-${block.id}">
			<p>${block.content}</p>
			<p>${block.description_html}</p>
		</div>
		`;
		channelBlocks.insertAdjacentHTML('beforeend', textItem);

		document.getElementById(`block-${block.id}`).addEventListener('click', () => {
			let modalContent = document.getElementById('modal-content');
			modalContent.innerHTML = '';

			modalContent.innerHTML = `
			<div class = "modal-container" >
				<img src="https://www.shareicon.net/download/2015/10/02/649720_write_512x512.png" > 
				<p>${block.content}</p>
				<p>${block.description_html}</p>
			</div>
			`;
			console.log("video", block)
			document.getElementById('modal').showModal();
		});

	}

	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type // Save us some repetition

		// Uploaded videos!
		if (attachment.includes('video')) {

			let videoItem =
				`
				<div class="block" id="block-${block.id}">
					<video autoplay muted src="${block.attachment.url}"></video>
				</div>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)

			document.getElementById(`block-${block.id}`).addEventListener('click', () => {
				let modalContent = document.getElementById('modal-content');
				modalContent.innerHTML = '';

				modalContent.innerHTML = `
				<div class = "modal-container" > 
					<video autoplay muted src="${block.attachment.url}"></video>
					<h2 class="modal-title">${block.title}</h2>
					<p class="modal-desc">${(block.description) ? block.description : "No Description Provided"}</p> 
				</div>
				`;
				console.log("video", block)
				document.getElementById('modal').showModal();
			});
		}

		// Uploaded PDFs!
		else if (attachment.includes('pdf')) {
			let pdfItem =
				`
			<div class="block" id="block-${block.id}">
				<img src="${block.image.original.url}">
			</div>
			`
			channelBlocks.insertAdjacentHTML('beforeend', pdfItem)

			document.getElementById(`block-${block.id}`).addEventListener('click', () => {
				let modalContent = document.getElementById('modal-content');
				modalContent.innerHTML = '';

				modalContent.innerHTML = `
			<div class = "modal-container" > 
				<img src="${block.image.original.url}">
				<h2><a href="${block.attachment.url}"> ${block.title} ↗</a></h2>
				<p class="modal-desc">${(block.description) ? block.description : "No Description Provided"}</p> 


			</div>
			`;
				console.log("pdf", block)
				document.getElementById('modal').showModal();
			});

		}

		// Uploaded audio!
		else if (attachment.includes('audio')) {
			let audioItem =
				`
				<div class="block" id="block-${block.id}">
		  			<img src="https://cdn.pixabay.com/animation/2023/10/24/13/50/13-50-26-112_512.gif"></img>
				</div>
				`
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)

			document.getElementById(`block-${block.id}`).addEventListener('click', () => {
				let modalContent = document.getElementById('modal-content');
				modalContent.innerHTML = '';
				modalContent.innerHTML = `
				<div class = "modal-container" > 
					<audio controls autoplay src="${block.attachment.url}"></audio>
					<h2 class="modal-title">${block.title}</h2>
					<p class="modal-desc">${(block.description) ? block.description : "No Description Provided"}</p> 
				</div>
				`;
				document.getElementById('modal').showModal();

				// closing the modal with pause the music - don't want sound continuing playing after close 
				document.getElementById('modal').addEventListener('cancel', function () {
					let sound = this.querySelectorAll('audio');
					sound.forEach(audio => {
						audio.pause();
						audio.currentTime = 0; // reset audio to beginning
					});
				});
			});
		}
	}

	// Linked media…
	else if (block.class == 'Media') {
		let embed = block.embed.type

		// Linked video!
		if (embed.includes('video')) {
			let linkedVideoItem =
				`
				<div class="block" id="block-${block.id}">
					<img src="${block.image.display.url}">
				</div>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)

			// video modal 
			document.getElementById(`block-${block.id}`).addEventListener('click', () => {
				let modalContent = document.getElementById('modal-content');
				modalContent.innerHTML = '';

				modalContent.innerHTML = `
				<div class = "modal-container" > 
					${block.embed.html}
					<h2 class="modal-title">${block.title}</h2>
					<p class="modal-desc">${(block.description) ? block.description : "No Description Provided"}</p> 
				</div>
				`;
				console.log("video", block)
				document.getElementById('modal').showModal();
			});
		}

		// Linked audio!
		else if (embed.includes('rich')) {
			let richItem =
				`
			<div class="block">
				<audio controls src="${block.rich.url}"></audio>
			</div>
			`
			channelBlocks.insertAdjacentHTML('beforeend', richItem)
		}

		console.log('media')
	}

}

// It‘s always good to credit your work:

let renderUser = (user) => { // You can have multiple arguments for a function!
	let footer = document.getElementById('footer')
	let userAddress =
		`
		<address>
			<p><a href="https://are.na/${user.slug}"> ${user.first_name} Arena Profile ↗</a></p>
		</address>
		`
	footer.insertAdjacentHTML('beforeend', userAddress)
}

// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log("Data", data) // Always good to check your response!
		placeChannelInfo(data) // Pass the data to the first function

		data.contents.reverse().forEach((block) => {
			renderBlock(block); // Render each block
		});

		// Also display the owner and collaborators:
		let channelUsers = document.getElementById('channel-users') // Show them together
		data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		renderUser(data.user, channelUsers)


		// function for shuffle blocks randomly
		let shuffleBlocks = () => {
			let container = document.getElementById('channel-blocks');

			container.style.transition = "opacity 0.5s ease";
			container.style.opacity = "0";

			setTimeout(() => {
				// turn blocks into array to shuffe - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
				let blocks = Array.from(container.children);

				// sort blocks randomly - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
				blocks.sort(() => Math.random() - 0.5);

				// for each block in the array, move block to the end of the array - sorting will ensure all blocks move around
				blocks.forEach(block => container.appendChild(block));

				container.style.opacity = "1";

			}, 500)
		}

		let blockInterval = setInterval(shuffleBlocks, 3000); //shuffle blocks every x seconds
		let shuffleButton = document.getElementById('block-shuffle');

		// Shuffle block button
		shuffleButton.addEventListener('click', () => {
			if (blockInterval) { // if shuffleInterval is active...
				// Stop shuffling
				clearInterval(blockInterval); // https://developer.mozilla.org/en-US/docs/Web/API/Window/clearInterval
				blockInterval = null;
				shuffleButton.textContent = "⬛ Start Shuffling Blocks"; // change text
				shuffleButton.style.color = "darkgreen";
			} else {
				// Start shuffling
				blockInterval = setInterval(shuffleBlocks, 1500);
				shuffleButton.textContent = "⬛ Stop Shuffling Blocks";
				shuffleButton.style.color = "darkred";
			}
		});

		// change block container to have different grid class so we can change grid layout - mobile and desktop
		let gridLayouts = []; //gridLayout empty array at first - populate later 

		if (window.innerWidth <= 700) {
			gridLayouts = ['mobile-grid', 'mobile-grid-two']
		} else {
			gridLayouts = ['original-grid', 'grid-two', 'grid-three']
		}

		let index = 0; //initialize index at 0, will be looping through this to change layouts. Having random layout sometimes produces duplicates layouts that don't look good 

		// change grid layout function
		let changeGridlayout = () => {
			let container = document.getElementById('channel-blocks'); //grab block container

			container.style.transition = "opacity 0.5s ease";
			container.style.opacity = "0";

			setTimeout(() => {
				gridLayouts.forEach(layout => container.classList.remove(layout)); //remove class for each block

				container.classList.add(gridLayouts[index]); // add the gridLayouts for that specific index (1,2 or 3)

				index = (index + 1) % gridLayouts.length; // increment index 

				// container.classList.add(randomLayout);
				container.style.opacity = "1";
			}, 500);
		}

		let layoutInterval = setInterval(changeGridlayout, 6000); //change layout every 1.5s
		let layoutButton = document.getElementById('layout-shuffle');

		// change grid layout button - same as shuffleButton function
		layoutButton.addEventListener('click', () => {
			if (layoutInterval) {
				clearInterval(layoutInterval);
				layoutInterval = null;
				layoutButton.textContent = "🔲 Start Shuffling Layouts";
				layoutButton.style.color = "darkgreen"
			} else {
				layoutInterval = setInterval(changeGridlayout, 1500);
				layoutButton.textContent = "🔲 Stop Shuffling Layouts";
				layoutButton.style.color = "darkred"
			}
		});

		// Toggle Blur button
		let blurButton = document.getElementById('toggle-blur');
		let blurActive = false;

		blurButton.addEventListener('click', () => {
			if (blurActive) {
				document.querySelectorAll('.block').forEach(block => {
					block.classList.remove('blur');
				});
				blurActive = false;
				blurButton.textContent = "👓 Remove Blur";
			} else {
				document.querySelectorAll('.block').forEach(block => {
					block.classList.add('blur');
				});
				blurActive = true;
				blurButton.textContent = "🕶️ Overlay Blur";
			};
		})

		// close modal function
		document.getElementById('close-modal').addEventListener('click', () => {
			document.getElementById('modal').close();
		});

		// Unblur on mobile visible function
		// https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
		// https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/isIntersecting
		let observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('unblur');
				} else {
					entry.target.classList.remove('unblur');
				}
			});
		}, { threshold: 0.5 }); // unblurs at 50%

		document.querySelectorAll('.block').forEach(block => {
			observer.observe(block);
		});
	});
