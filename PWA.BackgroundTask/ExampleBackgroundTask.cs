using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel.Background;
using Windows.Storage;

namespace PWA.BackgroundTask
{
    public sealed class ExampleBackgroundTask : IBackgroundTask
    {
        private BackgroundTaskDeferral _deferral;
        public void Run(IBackgroundTaskInstance taskInstance)
        {
            _deferral = taskInstance.GetDeferral();

            ApplicationData.Current.LocalSettings.Values["fromBackgroundTask"] = $"TimeZone changed at {DateTime.Now.ToString()}";
            
            _deferral.Complete();
        }
    }
}
