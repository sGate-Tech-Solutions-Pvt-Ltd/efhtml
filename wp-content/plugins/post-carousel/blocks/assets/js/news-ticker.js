document.addEventListener( 'DOMContentLoaded', function () {
	// news-ticker-slide and fade--------------------------------
	const sliders = document.querySelectorAll( '.sps-news-ticker-slider' );

	sliders?.forEach( ( slider ) => {
		const options = JSON.parse(
			slider.getAttribute( 'data-swiper-options' ) || '{}'
		);
		const parentContainer = slider.closest( '.sp-smart-post-swiper' );
		const pauseButton = parentContainer.querySelector( '.sp-icon-toggle' );
		
		if ( ! options ) {
			return;
		}
		if ( ! Object.keys( options ).length ) return;

		let tickerSwiper = new PCPSwiper( slider, options );
		let updateSwiperPause = false;
		if ( pauseButton ) {
			pauseButton.addEventListener( 'click', () => {
				updateSwiperPause = ! updateSwiperPause;
				if ( updateSwiperPause ) {
					tickerSwiper.autoplay.stop();
				} else {
					tickerSwiper.autoplay.start();
				}
			} );
		}
	} );

	// news-ticker-ticker--------------------------------
	const tickers = document.querySelectorAll( '.sp-news-ticker' );
	tickers?.forEach( ( ticker ) => {
		const options = JSON.parse(
			ticker.getAttribute( 'data-options' ) || '{}'
		);

		const tickerSpeed = parseInt( options.speed ) || 3000;
		const pxPerSecond = ( 1000 * 250 ) / tickerSpeed;
		const direction =
			options.direction === 'left_to_right' ? 'right' : 'left';
		const pauseOnHover = options.pauseOnHover;

		const wrapper = document.createElement( 'div' );
		wrapper.classList.add( 'sp-marquee-inner' );

		const originalHTML = ticker.innerHTML;
		wrapper.innerHTML = originalHTML + originalHTML;
		ticker.innerHTML = '';
		ticker.appendChild( wrapper );

		// Ensure inline-block for proper scroll width
		wrapper.style.whiteSpace = 'nowrap';

		let scrollX = direction === 'left' ? 0 : -wrapper.scrollWidth / 2;
		let lastTimestamp = null;
		let rafId;

		function animate( timestamp ) {
			if ( ! lastTimestamp ) lastTimestamp = timestamp;
			const delta = ( timestamp - lastTimestamp ) / 1000;
			lastTimestamp = timestamp;

			const distance = pxPerSecond * delta;
			scrollX += direction === 'left' ? -distance : distance;

			wrapper.style.transform = `translateX(${ scrollX }px)`;

			// Reset logic based on scroll direction
			const halfWidth = wrapper.scrollWidth / 2;
			if ( direction === 'left' && Math.abs( scrollX ) >= halfWidth ) {
				scrollX = 0;
			}
			if ( direction === 'right' && scrollX >= 0 ) {
				scrollX = -halfWidth;
			}

			rafId = requestAnimationFrame( animate );
		}

		rafId = requestAnimationFrame( animate );

		if ( pauseOnHover ) {
			ticker.addEventListener( 'mouseenter', () => {
				cancelAnimationFrame( rafId );
			} );
			ticker.addEventListener( 'mouseleave', () => {
				lastTimestamp = null;
				rafId = requestAnimationFrame( animate );
			} );
		}
	} );

	// news-ticker-typewriter--------------------------------
	const elements = document.querySelectorAll(
		'.sps-news-ticker-typewriter-js'
	);

	elements?.forEach( ( el ) => {
		const posts = JSON.parse( el.dataset.posts || '[]' );
		if ( ! posts.length ) return;

		let postIndex = 0;
		let charIndex = 0;
		let isDeleting = false;
		let currentText = '';
		let lastTime = 0;
		let delay = 60;
		const titleEl = el.querySelector( '.sp-smart-post-ticker-title' );
		const imgEl = el.querySelector( '.sp-ticker-img.sp-img-circle' );
		//let paused = false; // Default value for Pause on Hover

		// el.addEventListener( 'mouseenter', () => {
		// 	paused = true;
		// } );
		// el.addEventListener( 'mouseleave', () => {
		// 	paused = false;
		// } );
		// Preload next image
		function preloadImage( index ) {
			const nextIndex = ( index + 1 ) % posts.length;
			if ( posts[ nextIndex ]?.thumbUrl ) {
				const img = new Image();
				img.src = posts[ nextIndex ].thumbUrl;
			}
		}

		function updateText( timestamp ) {
			if ( ! lastTime ) lastTime = timestamp;

			const { title, url, target, thumbUrl } = posts[ postIndex ];
			// Update image (only when changing posts)
			if ( ! isDeleting && charIndex === 0 && imgEl && thumbUrl ) {
				imgEl.style.opacity = '0';
				setTimeout( () => {
					imgEl.src = thumbUrl;
					imgEl.alt = title;
					imgEl.style.opacity = '1';
				}, 200 );
				preloadImage( postIndex );
			}

			const delta = timestamp - lastTime;
			if ( delta >= delay ) {
				// const { title, url, target, thumbUrl } = posts[ postIndex ];

				if ( isDeleting ) {
					charIndex--;
				} else {
					charIndex++;
				}

				currentText = title.substring( 0, charIndex );

				if ( titleEl ) {
					titleEl.innerText = currentText; // Update the visible text
					titleEl.href = url; // Update the link
					titleEl.target = target || '_self'; // Set target (e.g., _blank)
				}

				delay = isDeleting ? 20 : 60;

				if ( ! isDeleting && currentText === title ) {
					delay = 1500; // Pause after full text
					isDeleting = true;
				} else if ( isDeleting && charIndex === 0 ) {
					isDeleting = false;
					postIndex = ( postIndex + 1 ) % posts.length;
					delay = 800; // Pause before next word
				}

				lastTime = timestamp;
			}

			requestAnimationFrame( updateText );
		}

		requestAnimationFrame( updateText );
	} );
} );
