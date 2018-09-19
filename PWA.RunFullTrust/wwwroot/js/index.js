$(function () {
    $('#lanuchWin32ProcessButton').click(function () {
        if (window.Windows) {
            Windows.ApplicationModel.FullTrustProcessLauncher.launchFullTrustProcessForCurrentAppAsync();
        } else {
            alert("I'm running on the browser.");
        }
    });
    $('#registerBackgroundButton').click(function () {
        if (window.Windows) {
            var allTasks = Windows.ApplicationModel.Background.BackgroundTaskRegistration.allTasks;
            if (allTasks.size !== 0) {
                var task = allTasks.first();
                while (task.hasCurrent) {
                    task.current.value.unregister(true);
                    task.moveNext();
                }
            }

            var builder = new Windows.ApplicationModel.Background.BackgroundTaskBuilder();
            builder.name = "ExampleBackgroundTask";
            builder.taskEntryPoint = "PWA.BackgroundTask.ExampleBackgroundTask";
            builder.setTrigger(new Windows.ApplicationModel.Background.SystemTrigger(Windows.ApplicationModel.Background.SystemTriggerType.timeZoneChange, true));
            Windows.ApplicationModel.Background.BackgroundExecutionManager.requestAccessAsync().then(function (result) {
                if (result === Windows.ApplicationModel.Background.BackgroundAccessStatus.allowedWithAlwaysOnRealTimeConnectivity ||
                    result === Windows.ApplicationModel.Background.BackgroundAccessStatus.allowedMayUseActiveRealTimeConnectivity ||
                    result === Windows.ApplicationModel.Background.BackgroundAccessStatus.allowedSubjectToSystemPolicy ||
                    result === Windows.ApplicationModel.Background.BackgroundAccessStatus.alwaysAllowed ) {
                    var newTask = builder.register();
                    newTask.addEventListener('completed', function (e) {
                        var resultFromBackgroundTask = Windows.Storage.ApplicationData.current.localSettings.values["fromBackgroundTask"];
                        $("#output").text("Background result: " + resultFromBackgroundTask);
                    });
                } else {
                    var dialog = new Windows.UI.Popups.MessageDialog("denied: " + result);
                    dialog.showAsync();
                }
            });
        } else {
            alert("I'm running on the browser.");
        }
    });
});
