


const scriptsInEvents = {

	async EventSheet1_Event4_Act1(runtime, localVars)
	{
		for (let i = 0; i < 100; i++) {
			runtime.objects.apple.createInstance("Layer 0", runtime.random() * runtime.layout.width, runtime.random() * runtime.layout.height);
			console.log("i: " + i);
		}
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

