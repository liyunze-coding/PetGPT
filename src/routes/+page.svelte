<script lang="ts">
	import { onMount, afterUpdate } from "svelte";
	import userIcon from "$lib/assets/user-pfp.jpeg";
	import gptIcon from "$lib/assets/gpt-icon.webp";

	// sleep function
	const sleep = (ms: number) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	let thinkingChar: string = `█`;
	let prompt: string = "";
	let hideIntro: boolean = false;
	let messagesAndResponses: { message: string; response: string }[] = [];
	let currentPrompt: string = "";
	let currentResponse: string = "";
	let messagesDiv: any;
	let promptInput: any;
	let disableInput: boolean = false;

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (prompt === "") return;

		hideIntro = true;

		currentPrompt = prompt;
		respond();

		prompt = "";
	};

	const generateAnimalNoises = () => {
		const noises = [
			"bark",
			"meow",
			"quack",
			"moo",
			"oink",
			"neigh",
			"roar",
			"chirp",
			"cluck",
			"arf arf",
			"hiss",
			"woof",
			"grrrr",
			"rawr",
			"snarl",
			"bark bark",
		];

		let punctuations = ["~", "!"];

		let response: string = "";

		for (let i = 0; i < Math.floor(Math.random() * 5) + 20; i++) {
			response += noises[Math.floor(Math.random() * noises.length)];

			// 50% chance
			if (Math.random() > 0.5) {
				response +=
					punctuations[
						Math.floor(Math.random() * punctuations.length)
					];
			}

			response += " ";
		}

		response = response.slice(0, -1);

		// check if last character of respose is a punctuation
		if (punctuations.includes(response[response.length - 1])) {
			response = response.slice(0, -1);
		}

		// capitalize first letter
		response = response[0].toUpperCase() + response.slice(1);

		response += ".";

		return response;
	};

	const respond = async () => {
		let response = generateAnimalNoises();

		messagesAndResponses = [
			...messagesAndResponses,
			{ message: prompt, response: response },
		];

		disableInput = true;
		for (let i = 0; i < response.length + 1; i++) {
			currentResponse = response.slice(0, i);
			await sleep(50);
		}
		disableInput = false;

		// auto select prompt input
		await sleep(100);
		promptInput.focus();
		promptInput.select();
	};

	const scrollToBottom = (node: any) => {
		const scroll = () =>
			node.scroll({
				top: node.scrollHeight,
			});
		scroll();

		return { update: scroll };
	};

	const onNewChat = (e: any) => {
		e.preventDefault();
		messagesAndResponses = [];
		hideIntro = false;
	};

	afterUpdate(() => {
		scrollToBottom(messagesDiv);
	});

	onMount(() => {
		function submitOnEnter(event: any) {
			if (event.which === 13) {
				if (!event.repeat) {
					const newEvent = new Event("submit", {
						cancelable: true,
					});
					event.target.form.dispatchEvent(newEvent);
				}

				event.preventDefault(); // Prevents the addition of a new line in the text field
			}
		}

		document
			.getElementById("message")!
			.addEventListener("keydown", submitOnEnter);
	});
</script>

<main class="flex flex-row">
	<div class="w-69 h-screen bg-gray-700 px-2 py-1">
		<!-- new chat -->
		<div
			class="h-11.5 border-solid border border-white/20 rounded-md p-3 mt-1 mb-2 hover:bg-gray-500 transition duration-100 flex justify-start items-center text-sm cursor-pointer"
			on:click={onNewChat}
			on:keydown={onNewChat}
		>
			<!-- svg white '+' icon -->
			<svg
				stroke="currentColor"
				fill="none"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="h-4 w-4"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<line x1="12" y1="5" x2="12" y2="19" />
				<line x1="5" y1="12" x2="19" y2="12" />
			</svg>

			<span class="ml-3 text-white">New chat</span>
		</div>
	</div>

	<main
		class="h-screen bg-primary flex flex-grow items-center justify-start flex-col relative"
	>
		<div
			class="flex h-1/5 w-full items-end justify-center font-semibold text-4xl"
			class:hidden={hideIntro}
		>
			PetGPT
		</div>
		<div
			class="h-3/5 w-full flex justify-center pt-16"
			class:hidden={hideIntro}
		>
			<div
				class="w-60 h-full flex flex-col justify-start items-center mx-2"
			>
				<div class="w-7 h-7">
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						width="25px"
						height="25px"
						fill="#ffffff"
						viewBox="0 0 1000 1000"
						enable-background="new 0 0 1000 1000"
						xml:space="preserve"
					>
						<metadata>
							Svg Vector Icons :
							http://www.onlinewebfonts.com/icon
						</metadata>
						<g
							><g
								transform="translate(0.000000,430.000000) scale(0.100000,-0.100000)"
								><path
									d="M4917.8,4189.1c-27.4-11.4-70.8-50.3-98.2-84.5c-48-61.7-50.3-70.8-43.4-847.5l6.9-783.5l64-61.7c84.5-86.8,221.6-84.5,310.7,2.3l59.4,59.4l6.9,788.1l6.8,785.8l-64,68.5C5098.2,4191.4,4995.4,4221,4917.8,4189.1z"
								/><path
									d="M1536.9,2761.3c-84.5-84.5-98.2-159.9-45.7-260.4c59.4-109.7,1069.1-1096.5,1142.2-1114.8c102.8-25.1,223.9,48,260.4,159.9c16,48,22.8,109.6,13.7,137.1c-18.3,59.4-1025.7,1078.2-1110.2,1123.9C1696.8,2859.6,1621.4,2845.8,1536.9,2761.3z"
								/><path
									d="M8186.7,2795.6c-127.9-80-1080.5-1060-1098.8-1130.8c-36.6-148.5,134.8-313,285.5-276.4c66.2,16,1080.5,1012,1135.3,1112.5c52.6,100.5,38.8,175.9-45.7,260.4C8374,2850.4,8291.8,2861.8,8186.7,2795.6z"
								/><path
									d="M4520.3,1584.9c-881.8-194.2-1542-827-1786.4-1711c-41.1-148.5-50.2-237.6-50.2-575.7c0-438.6,25.1-578,169-920.6c212.4-511.7,715-1014.3,1226.7-1226.7c342.7-143.9,482-169.1,920.6-169.1s577.9,25.1,920.6,169.1c511.7,212.4,1014.3,715,1226.7,1226.7c143.9,342.7,169,482,169,920.6c0,438.6-25.1,577.9-169,920.6c-212.4,511.7-715,1014.3-1226.7,1226.7c-306.1,127.9-488.8,164.5-863.5,173.6C4783,1626,4675.6,1619.1,4520.3,1584.9z M5509.4,1091.5c322.1-93.7,536.8-214.7,779-443.2c244.4-233,404.3-495.7,507.1-840.7c54.8-175.9,61.7-239.9,61.7-509.4c0-269.6-6.8-333.5-61.7-509.4c-98.2-326.7-219.3-539.1-445.5-779c-233-244.4-495.7-404.3-840.6-507.1c-175.9-54.8-239.9-61.7-509.4-61.7s-333.5,6.8-509.4,61.7c-344.9,102.8-607.6,262.7-840.7,507.1c-228.4,242.2-349.5,456.9-443.2,776.7C3017.2-557.9,3195.3,125.2,3684.2,614c281,281,628.2,461.4,1028,534.6C4913.2,1185.1,5285.5,1157.7,5509.4,1091.5z"
								/><path
									d="M175.4-539.6c-61.7-54.8-75.4-82.2-75.4-162.2c0-80,13.7-107.4,75.4-162.2l75.4-68.5l785.8,6.9l788.1,6.8l61.7,64c86.8,84.5,84.5,221.6-2.3,310.7l-59.4,59.4l-788.1,6.9l-785.8,6.9L175.4-539.6z"
								/><path
									d="M8186.7-493.9c-143.9-59.4-182.7-253.6-70.8-365.5l59.4-59.4l788.1-6.8l785.8-6.9l75.4,68.5c61.7,54.8,75.4,82.3,75.4,162.2c0,80-13.7,107.4-75.4,162.2l-73.1,66.3l-760.7-2.3C8575.1-475.6,8211.8-484.8,8186.7-493.9z"
								/><path
									d="M2590-2805.7c-70.8-41.1-1062.2-1030.2-1098.8-1098.8c-52.5-100.5-38.8-175.9,45.7-260.4c84.5-84.5,159.9-98.2,260.4-45.7c105.1,57.1,1096.5,1069.1,1112.5,1139.9c20.6,77.7-25.1,191.9-89.1,233C2749.9-2792,2642.5-2778.3,2590-2805.7z"
								/><path
									d="M7199.9-2826.3c-89.1-52.5-139.3-196.5-95.9-278.7c36.6-73.1,1023.4-1064.5,1098.8-1105.7c100.5-52.5,175.9-38.8,260.4,45.7c84.5,84.5,98.2,159.9,45.7,260.4c-41.1,73.1-1032.5,1062.2-1103.3,1098.8C7334.6-2769.2,7282.1-2773.7,7199.9-2826.3z"
								/><path
									d="M4940.6-3756c-27.4-4.6-73.1-34.3-102.8-66.3l-54.8-59.4l-6.9-783.5l-6.9-785.8l68.5-75.4c54.8-61.7,82.2-75.4,162.2-75.4s107.4,13.7,162.2,75.4l68.5,75.4l-6.8,785.8l-6.9,788.1l-57.1,54.8C5100.5-3762.9,5020.6-3737.8,4940.6-3756z"
								/></g
							></g
						>
					</svg>
				</div>
				<span class="text-lg text-white mt-3">Examples</span>
				<div
					class="w-full bg-gray-300 rounded-md mt-3 px-3 py-3 text-center text-sm hover:bg-gray-700 transition-colors duration-100 cursor-pointer"
					on:click={() => {
						prompt =
							"Explain quantum physics in terms of animal noises";
					}}
					on:keydown={() => {
						prompt =
							"Explain quantum physics in terms of animal noises";
					}}
				>
					"Explain quantum physics in terms of animal noises" →
				</div>
				<div
					class="w-full bg-gray-300 rounded-md mt-3 px-3 py-3 text-center text-sm hover:bg-gray-700 transition-colors duration-100 cursor-pointer"
					on:click={() => {
						prompt =
							"Got any creative animal noises you can make?";
					}}
					on:keydown={() => {
						prompt =
							"Got any creative animal noises you can make?";
					}}
				>
					"Got any creative animal noises you can make?" →
				</div>
				<div
					class="w-full bg-gray-300 rounded-md mt-3 px-3 py-3 text-center text-sm hover:bg-gray-700 transition-colors duration-100 cursor-pointer"
					on:click={() => {
						prompt =
							"Describe an ecosystem of pythons, pandas and turtles";
					}}
					on:keydown={() => {
						prompt =
							"Describe an ecosystem of pythons, pandas and turtles";
					}}
				>
					"Describe an ecosystem of pythons, pandas and turtles"
					→
				</div>
			</div>
			<div
				class="w-60 h-full flex flex-col justify-start items-center mx-2"
			>
				<div class="w-7 h-7">
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						width="25px"
						height="25px"
						fill="#ffffff"
						viewBox="0 0 1000 1000"
						enable-background="new 0 0 1000 1000"
						xml:space="preserve"
					>
						<g
							><path
								d="M989.9,395.3c0-0.2,0-0.4,0-0.6c0-19.2-15.5-34.7-34.7-34.7H577.4l61.4-313.8c2.5-12.9-5-25.7-17.5-32.2c-12.2-8.4-28-8.6-38.4,0.6l-561,492.3c-4,3.6-6.8,8.1-8.3,13c-2.3,4.6-3.5,9.8-3.5,15.2c0,19.2,15.5,34.7,34.7,34.7h381.5l-66.6,373c-0.3,1.8-0.5,3.5-0.5,5.3c-3.3,11.4-0.2,24.5,9.1,33.9c13.4,13.4,34.6,14,47.3,1.3l565.2-563.5C987.4,413.1,990.4,404.2,989.9,395.3z M501.8,541.5c3.4-18.9-9.2-36.9-28.1-40.3c-1.1-0.2-2.3-0.3-3.4-0.4c-1.8-0.3-3.7-0.5-5.6-0.5H133.3l417.6-366.4l-49.7,254c-0.8,4.1-0.6,8.1,0.5,12c2.5,16.7,16.9,29.5,34.3,29.5h337.9L445.7,856.3L501.8,541.5z"
							/></g
						>
					</svg>
				</div>
				<span class="text-lg text-white mt-3">Capabilities</span>
				<div
					class="w-full bg-gray-300 rounded-md mt-3 px-3 py-3 text-center text-sm"
				>
					Doesn't understand what you're saying at all
				</div>
				<div
					class="w-full bg-gray-300 rounded-md mt-3 px-3 py-3 text-center text-sm"
				>
					Allows users to say anything without any restrictions
				</div>
				<div
					class="w-full bg-gray-300 rounded-md mt-3 px-3 py-3 text-center text-sm"
				>
					Trained to make animal noises and mimic animal
					behaviours
				</div>
			</div>
			<div
				class="w-60 h-full flex flex-col justify-start items-center mx-2"
			>
				<div class="w-7 h-7">
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						width="25px"
						height="25px"
						fill="#ffffff"
						viewBox="0 0 1000 1000"
						enable-background="new 0 0 1000 1000"
						xml:space="preserve"
					>
						<metadata>
							Svg Vector Icons :
							http://www.onlinewebfonts.com/icon
						</metadata>
						<g
							><path
								d="M500,98.8l410.7,818.5H89.3L500,98.8L500,98.8z M500,10c-21.1,0-42.2,14.2-58.3,42.7L23.4,886.4C-8.6,943.4,18.7,990,84,990h832c65.4,0,92.6-46.6,60.6-103.6l0,0L558.3,52.7C542.2,24.3,521.1,10,500,10L500,10L500,10z"
							/><path
								d="M561.3,806.2c0,33.8-27.4,61.2-61.2,61.2c-33.8,0-61.2-27.4-61.2-61.2c0-33.8,27.4-61.3,61.2-61.3C533.8,745,561.3,772.4,561.3,806.2z"
							/><path
								d="M500,683.7c-33.8,0-61.2-27.4-61.2-61.3V438.8c0-33.8,27.4-61.2,61.2-61.2c33.8,0,61.2,27.4,61.2,61.2v183.7C561.3,656.3,533.8,683.7,500,683.7z"
							/></g
						>
					</svg>
				</div>
				<span class="text-lg text-white mt-3">Warning</span>
				<div
					class="w-full bg-gray-300 rounded-md mt-3 px-3 py-3 text-center text-sm"
				>
					May come off as a little startling at first but is very
					fun
				</div>
				<div
					class="w-full bg-gray-300 rounded-md mt-3 px-3 py-3 text-center text-sm"
				>
					May occasionally produce unwanted animal noises or
					behaviours
				</div>
				<div
					class="w-full bg-gray-300 rounded-md mt-3 px-3 py-3 text-center text-sm"
				>
					Limited knowledge of animal noises and behaviours
				</div>
			</div>
		</div>

		<div
			class="text-white w-full h-4/5 overflow-y-scroll flex flex-col"
			class:hidden={!hideIntro}
			bind:this={messagesDiv}
		>
			{#each messagesAndResponses as conversation, i}
				<div
					class="prompt-message w-full h-fit py-7 pl-5 flex flex-row items-center justify-center"
				>
					<div class="flex max-w-3xl w-full">
						<div class="prompt-message-icon mr-5">
							<img
								src={userIcon}
								alt="user profile"
								class="w-7 rounded-md aspect-square block"
							/>
						</div>
						<div
							class="prompt-message-content text-sm w-full"
						>
							{conversation.message}
						</div>
					</div>
				</div>
				<div
					class="reply-message w-full h-fit py-7 pl-5 flex flex-row items-center justify-center bg-gray-200"
				>
					<div class="flex max-w-3xl w-full">
						<div class="reply-message-icon mr-5 p-0">
							<img
								src={gptIcon}
								alt="gpt profile"
								class="w-7 rounded-md aspect-square block"
							/>
						</div>
						<div
							class="reply-message-content text-sm max-w-2xl w-full"
						>
							{#if i !== messagesAndResponses.length - 1}
								{conversation.response}
							{:else}
								{currentResponse}
								<span class:hidden={!disableInput}
									>{thinkingChar}</span
								>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div
			class="prompt-div h-1/5 w-full flex flex-row items-center justify-center absolute bottom-0 right-0 bg-gray-400"
		>
			<form
				id="form"
				on:submit={handleSubmit}
				class="w-2/3 h-full flex flex-row items-center justify-center"
			>
				<textarea
					id="message"
					placeholder="Send a message..."
					bind:value={prompt}
					bind:this={promptInput}
					disabled={disableInput}
					rows="1"
					class="bg-gray-200 placeholder:text-gray-150 text-sm opacity-100 px-4 py-4 pr-12 rounded-lg w-full"
				/>
				<input
					type="submit"
					value=""
					class="-ml-10 cursor-pointer"
				/>
			</form>
		</div>
	</main>
</main>

<svelte:head>
	<title>PetGPT</title>
	<link rel="icon" type="image/png" href="/favicon.png" />

	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#2f3135" />
	<meta name="description" content="PetGPT" />
	<meta name="keywords" content="PetGPT" />
	<meta name="author" content="RyanPython" />

	<meta property="og:title" content="PetGPT" />
	<meta property="og:type" content="website" />
</svelte:head>

<style lang="postcss">
	@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&family=Roboto:wght@100;300;400;500&display=swap");

	/* hex codes, brightest to darkest */
	/* 
	100 #eeeeee - text
	150 #81889b - text placeholder
	200 #40414f - chat bar
	300 #3e3f4b - suggestions div
	400 #343541 - main bg color
	500 #2b2c2f - highlight new
	600 #2a2b32 - highlight old
	700 #202123 - hover suggestion div, left bar
	*/

	:global(html) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		background-color: theme(colors.primary);
		color: theme(colors.secondary);
		font-family: "Noto Sans", sans-serif;
		text-spacing: 0.1em;
	}

	textarea:focus,
	input:focus {
		outline: none;
	}

	textarea {
		resize: none;
		overflow: hidden;
	}

	input[type="submit"] {
		background-image: url("/images/submit-icon.svg");
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: center;
		width: 20px;
		height: 20px;
	}
</style>
